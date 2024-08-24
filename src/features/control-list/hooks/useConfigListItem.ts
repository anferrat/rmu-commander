import { useCallback, useEffect, useRef, useState } from "react"
import { CommandStatus, SendCommandTypes, SiteStatus } from "../../../constants/constants"
import { getSiteStatus, removeItemFromCommandListener, sendCommand } from "../../../app/controllers/controller"
import { convertDataToStateValues } from "../helpers/functions"
import { errorHandler } from "../../../errors/errorHandler"
import { EventRegister } from "react-native-event-listeners"
import { Events } from "../../../constants/events"
import { CommandState } from "../../../app/entities/corview.cloud/CommandState"
import { SendCommandPayload } from "../../../app/entities/corview.cloud/SendCommandPayload"

type OnOffType = {
    on: null | number,
    off: null | number
}

const initialOnOff = {
    on: null,
    off: null
}

interface useConfigListItemProps {
    siteId: string
    companyId: string
    configOn: number //on and off value from the config. Should be displayed by default exept when interrupting, then should display actuall on/off from SiteState
    configOff: number,
    userId: string | null,
    note: string
}

export const useConfigListItem = ({ siteId, companyId, configOn, configOff, userId, note }: useConfigListItemProps) => {
    const [loading, setLoading] = useState(false)
    const [onOff, setOnOff] = useState<OnOffType>(initialOnOff)
    const [status, setStatus] = useState<SiteStatus | null>(null)
    const [siteName, setSiteName] = useState<string | null>(null)
    const [groupName, setGroupName] = useState<string | null>(null)
    const [groupId, setGroupId] = useState<string | null>(null)
    const [onFirst, setOnFirst] = useState<boolean | null>(null)
    const [doneMessage, setDoneMessage] = useState<string>('')
    const [updating, setUpdating] = useState<boolean>(false)
    const [autoUpdate, setAutoUpdate] = useState<boolean>(false)
    const connected = status !== null
    const commandStateTimestamp = useRef<number | null>(null)


    const onConnect = useCallback(async () => {
        setLoading(true)
        const { response, isOk, error } = await getSiteStatus(siteId, companyId)
        if (isOk) {
            const { siteState, commandState } = response!
            const { siteName, groupName, onFirst, doneMessage, status, on, off, groupId } = convertDataToStateValues(commandState, siteState)
            setOnOff({ on, off })
            setStatus(status)
            setSiteName(siteName)
            setGroupName(groupName)
            setOnFirst(onFirst)
            setDoneMessage(doneMessage)
            setGroupId(groupId)
            setUpdating(false)
            commandStateTimestamp.current === null
        }
        else
            errorHandler(error!)
        setLoading(false)
    }, [])

    const _sendCommand = useCallback(async (commandType: SendCommandTypes, startTime?: number, endTime?: number) => {
        if (userId !== null && onFirst !== null && groupId !== null) {
            setLoading(true)
            const sendCommandPayload = new SendCommandPayload(commandType, userId, siteId, groupId, companyId, onFirst, configOn, configOff, startTime, endTime, note)
            const { isOk, error, response } = await sendCommand(sendCommandPayload)
            if (isOk) {
                setStatus(SiteStatus.AWT)
                setAutoUpdate(response!)
            }
            else
                errorHandler(error!)
            setLoading(false)
        }
    }, [userId, siteId, groupId, companyId, onFirst, configOn, configOff, note])

    useEffect(() => {
        let updateListener: any
        let commandStateUpdateListener: any
        let interrupterListener: any
        if (connected) {

            interrupterListener = EventRegister.addEventListener(Events.TIME_SELECTED, (data) => {
                if (data.siteId === siteId && data.companyId === companyId) {
                    _sendCommand(SendCommandTypes.START_INTERRUPTING, data.startTime, data.endTime)
                }
            })

            updateListener = EventRegister.addEventListener(Events.UPDATING_COMMAND_STATE, (data) => {
                if (data.siteId === siteId && data.companyId === companyId)
                    setUpdating(true)
            })

            commandStateUpdateListener = EventRegister.addEventListener(Events.NEW_COMMAND_STATE, (commandState: CommandState) => {
                if (commandState.companyId === companyId && commandState.siteId === siteId) { //siteId and companyId check
                    if (commandStateTimestamp.current === null || commandState.timestamp > commandStateTimestamp.current) //timestamp check (make sure command state is the latest one)
                        commandStateTimestamp.current = commandState.timestamp
                    if (commandState.status !== CommandStatus.AWAIT_CONFIRM) {
                        removeItemFromCommandListener(siteId, companyId)
                        EventRegister.emit(Events.RESET_TIME_TO_UPDATE, { siteId, companyId })
                        onConnect()
                    }
                    else {
                        setDoneMessage(commandState.message)
                        setUpdating(false)
                    }
                }
            })
        }
        return () => {
            if (connected && updateListener)
                EventRegister.removeEventListener(updateListener)
            if (connected && interrupterListener)
                EventRegister.removeEventListener(interrupterListener)
            if (connected && commandStateUpdateListener)
                EventRegister.removeEventListener(commandStateUpdateListener)
        }
    }, [connected, _sendCommand])

    const onInterrupt = useCallback(() => {
        EventRegister.emitEvent(Events.SHOW_TIME_SELECTION, { siteId, companyId })
    }, [siteId, companyId])

    const onTurnOn = useCallback(() => _sendCommand(SendCommandTypes.TURN_ON), [_sendCommand])

    const onShutOff = useCallback(() => _sendCommand(SendCommandTypes.SHUT_OFF), [_sendCommand])

    return {
        connected,
        loading,
        status,
        on: onOff.on === null ? configOn : onOff.on,
        off: onOff.off === null ? configOff : onOff.off,
        siteName,
        groupName,
        onFirst,
        doneMessage,
        updating,
        autoUpdate,
        onConnect,
        onInterrupt,
        onTurnOn,
        onShutOff,
    }


}