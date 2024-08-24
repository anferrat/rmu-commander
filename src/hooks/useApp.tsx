import { useEffect, useRef, useState } from "react"
import { getUserInfo, initializeApp } from "../app/controllers/controller"
import { setIsLoggedIn, setUser, useTypedSelector } from "../stores/global"
import { useDispatch } from "react-redux"

export const useApp = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const dispatch = useDispatch()
    const isLoggedIn = useTypedSelector(state => state.global.isLoggedIn)
    const logRef = useRef(true)

    useEffect(() => {
        const loadData = async (): Promise<void> => {
            const { isOk, response } = await initializeApp()
            if (isOk) {
                dispatch(setIsLoggedIn(response!))
                if (!response!)
                    setIsLoading(false)
            }
            else {
                setIsLoading(false)
            }
        }
        loadData()
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            logRef.current = true
            const loadData = async () => {
                const { response, isOk } = await getUserInfo()
                if (isOk && logRef.current)
                    dispatch(setUser({
                        user: `${response?.firtsName} ${response?.lastName}`,
                        userId: response?.userId,
                        defaultCompanyId: response?.defaultCompanyId
                    }))
                setIsLoading(false)
            }
            loadData()
        }

        return () => {
            logRef.current = false
            if (isLoggedIn) {
                dispatch(setUser({
                    user: null,
                    userId: null,
                    defaultCompanyId: null
                }))
            }
        }
    }, [isLoggedIn])

    return {
        isLoading,
        isLoggedIn
    }
}