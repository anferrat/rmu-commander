import { useCallback, useEffect, useRef, useState } from "react"
import { Config } from "../../../app/entities/Config"
import { addCommandListener, deleteConfig, getConfigList } from "../../../app/controllers/controller"
import { setIsLoggedIn, useTypedSelector } from "../../../stores/global"
import { errorHandler } from "../../../errors/errorHandler"
import { useDispatch } from "react-redux"
import { EventRegister } from "react-native-event-listeners"
import { Events } from "../../../constants/events"

export const useConfigList = () => {
    const userId = useTypedSelector(state => state.global.userId)
    const [configs, setConfigs] = useState<Config[]>([])
    const [loading, setLoading] = useState(true)
    const componentMounted = useRef(true)
    const dispatch = useDispatch()

    const loadConfigs = useCallback(async () => {
        setLoading(true)
        const { isOk, response, error } = await getConfigList(userId)
        if (isOk) {
            if (componentMounted.current)
                setConfigs(response!)
        }
        else {
            setConfigs([])
            errorHandler(error!)
        }
        setLoading(false)
    }, [userId])


    useEffect(() => {
        //Command listener - updates configs commans states in interval and emits event with new command state
        let listener: { remove: () => void }
        componentMounted.current = true
        try {
            listener = addCommandListener()
        }
        catch (er) {
            errorHandler(String(er))
            dispatch(setIsLoggedIn(false))
        }

        //Tracks newly created configuartions and adds them to config list
        const configAddListener: any = EventRegister.addEventListener(Events.CONFIG_ADDED, (config) => {
            setConfigs(state => [config].concat(state))
        })

        const configUpdateListener: any = EventRegister.addEventListener(Events.CONFIG_UPDATED, (config) => {
            setConfigs(state => {
                const index = state.findIndex(c => c.siteId === config.siteId && c.companyId === config.companyId)
                return ~index ? Object.assign([], state, { [index]: config }) : state
            })
        })


        return () => {
            componentMounted.current = false
            EventRegister.removeEventListener(configAddListener)
            EventRegister.removeEventListener(configUpdateListener)
            if (listener)
                listener.remove()
        }
    }, [])

    useEffect(() => {
        if (userId !== null)
            loadConfigs()
    }, [userId])

    const removeConfig = async (id: number, index: number, siteId: string, companyId: string) => {
        const { isOk, error } = await deleteConfig(id, siteId, companyId)
        if (isOk)
            setConfigs(state => state.filter((_, i) => i !== index))
        else
            errorHandler(error!)
    }

    return {
        configs,
        loading: loading || userId === null,
        userId,
        loadConfigs,
        removeConfig,
    }
}