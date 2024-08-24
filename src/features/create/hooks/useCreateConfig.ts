import { useCallback, useEffect, useRef, useState } from "react"
import { ConfigProperties, validation } from "../../../errors/validation"
import { getConfigById, saveConfig } from "../../../app/controllers/controller"
import { useTypedSelector } from "../../../stores/global"
import { isValidConfig } from "../helpers/functions"
import { useNavigation } from "@react-navigation/native"
import { errorHandler } from "../../../errors/errorHandler"
import { EventRegister } from "react-native-event-listeners"
import { Events } from "../../../constants/events"

export type SiteType = {
    siteId: string | null
    companyId: string | null,
    groupId: string | null
}

type UseCreateConfigProps = {
    id: number | null
    goBack: () => void
}

const initialState: SiteType = {
    siteId: null,
    companyId: null,
    groupId: null
}

export const useCreateConfig = ({ id, goBack }: UseCreateConfigProps) => {
    const userId = useTypedSelector(state => state.global.userId)
    const [name, setName] = useState('')
    const [nameValid, setNameValid] = useState(true)
    const [site, setSite] = useState(initialState)
    const [on, setOn] = useState('')
    const [onValid, setOnValid] = useState(true)
    const [off, setOff] = useState('')
    const [offValid, setOffValid] = useState(true)
    const [defaultNote, setDefaultNote] = useState('')
    const [siteSelectVisible, setSiteSelectVisible] = useState(false)
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()
    const isNew = id === null
    const componentMounted = useRef(true)

    useEffect(() => {
        componentMounted.current = true
        if (!isNew) {
            const loadData = async () => {
                const { isOk, response, error } = await getConfigById(id)
                if (isOk) {
                    if (componentMounted.current) {
                        const config = response!
                        setName(config.name)
                        setSite({
                            siteId: config.siteId,
                            companyId: config.companyId,
                            groupId: config.groupId,
                        })
                        setOn(String(config.on))
                        setOff(String(config.off))
                        setDefaultNote(config.note)
                    }
                }
                else {
                    errorHandler(error!)
                    goBack()
                }
            }
            loadData()
        }
        setLoading(false)
        return () => {
            componentMounted.current = false
        }
    }, [id])

    const hideSiteSelect = () => setSiteSelectVisible(false)

    const showSiteSelect = () => setSiteSelectVisible(true)

    const onChangeName = useCallback((text: string) => setName(text), [])

    const onChangeDefaultNote = useCallback((text: string) => setDefaultNote(text), [])

    const onValidateName = useCallback(() => {
        const { value, valid } = validation(name, ConfigProperties.NAME)
        setNameValid(valid)
        setName(value)
    }, [name])


    const onValidateDefaultNote = useCallback(() => {
        const { value } = validation(defaultNote, ConfigProperties.TEXT)
        setDefaultNote(value)
    }, [defaultNote])

    const onValidateCycle = useCallback((cycle: boolean) => {
        const { value, valid } = validation(cycle ? on : off, ConfigProperties.CYCLE)
        if (cycle) {
            setOnValid(valid)
            setOn(value)
        }
        else {
            setOffValid(valid)
            setOff(value)
        }
    }, [on, off])

    const onEditCycle = useCallback((cycle: boolean, text: string) => {
        if (cycle)
            setOn(text)
        else
            setOff(text)
    }, [])

    const onSiteSelect = useCallback((siteId: string, groupId: string | null, companyId: string) => {
        setSite({
            siteId,
            groupId,
            companyId
        })
    }, [])

    const resetSite = useCallback(() => {
        setSite(initialState)
    }, [])

    const onCreateHandler = async () => {
        setSaving(true)
        const isValid = isValidConfig(name, nameValid, onValid, on, offValid, off, site.companyId, site.siteId, userId, site.groupId)
        if (isValid) {
            const { isOk, error, response } = await saveConfig(id, name, Number(on), Number(off), defaultNote, site.companyId!, site.siteId!, userId!, site.groupId)
            if (isOk) {
                EventRegister.emit(isNew ? Events.CONFIG_ADDED : Events.CONFIG_UPDATED, response!)
                navigation.goBack()
            }
            else
                errorHandler(error!)
        }
        else
            errorHandler('Please enter all the required values')
        setSaving(false)
    }


    return {
        isNew,
        name,
        on,
        off,
        defaultNote,
        nameValid,
        onValid,
        offValid,
        siteSelectVisible,
        site,
        saving,
        loading,
        onValidateName,
        onValidateDefaultNote,
        onChangeName,
        onChangeDefaultNote,
        onEditCycle,
        onValidateCycle,
        onSiteSelect,
        showSiteSelect,
        hideSiteSelect,
        resetSite,
        onCreateHandler,
        setName
    }
}