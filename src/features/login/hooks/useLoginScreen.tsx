import { useCallback, useEffect, useState } from "react"
import { getLoginData, login, updateSetting } from "../../../app/controllers/controller"
import { setIsLoggedIn } from "../../../stores/global"
import { useDispatch } from 'react-redux'
import { errorHandler } from "../../../errors/errorHandler"

export const useLoginScreen = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [autoLogin, setAutoLogin] = useState(true)
    const [savePassword, setSavePassword] = useState(true)
    const [loading, setLoading] = useState(true)
    const [loggingIn, setLoggingIn] = useState(false)
    const dispatch = useDispatch()

    const loginHandler = useCallback(async () => {
        setLoggingIn(true)
        const { isOk, error } = await login(username, password, savePassword, autoLogin)
        setLoggingIn(false)
        dispatch(setIsLoggedIn(isOk))
        if (!isOk)
            errorHandler(String(error))
    }, [password, username, savePassword, autoLogin])

    useEffect(() => {
        const loadData = async () => {
            const { isOk, response } = await getLoginData()
            if (isOk) {
                const { credentials, settings } = response!
                if (credentials.username !== null)
                    setUsername(credentials.username)
                if (credentials.password !== null)
                    setPassword(credentials.password)
                setAutoLogin(settings.autoLogin)
                setSavePassword(settings.savePassword)
            }
            setLoading(false)
        }
        loadData()
    }, [])

    const onChangeSavePassword = useCallback(async (state: boolean) => {
        const { isOk } = await updateSetting('savePassword', state)
        if (isOk)
            setSavePassword(state)
    }, [])

    const onChangeAutoLogin = useCallback(async (state: boolean) => {
        const { isOk } = await updateSetting('autoLogin', state)
        if (isOk) {
            setAutoLogin(state)
            if (state) {
                onChangeSavePassword(true)
            }
        }
    }, [])


    return {
        username,
        password,
        autoLogin,
        savePassword,
        loading,
        loggingIn,
        onChangeUsername: setUsername,
        onChangePassword: setPassword,
        onChangeAutoLogin: onChangeAutoLogin,
        onChangeSavePassword: onChangeSavePassword,
        loginHandler
    }
}