import { useEffect, useRef, useState } from "react";
import { setIsLoggedIn, useTypedSelector } from "../../../stores/global";
import { logout } from "../../../app/controllers/controller";
import { useDispatch } from "react-redux";

export function useTopBar() {
    const [visible, setVisible] = useState(false)
    const [isLogginOut, setIsLoggingOut] = useState(false)
    const user = useTypedSelector(state => state.global.user)
    const dispatch = useDispatch()
    const componentMounted = useRef(true)

    const hidePopover = () => setVisible(false)
    const showPopover = () => setVisible(true)

    useEffect(() => {
        componentMounted.current = true
        return () => {
            componentMounted.current = false
        }
    })

    const logoutHandler = async (): Promise<void> => {
        setIsLoggingOut(true)
        const { isOk } = await logout()
        if (isOk) {
            dispatch(setIsLoggedIn(false))
        }
        if (componentMounted.current)
            setIsLoggingOut(false)
    }

    return {
        hidePopover,
        showPopover,
        logoutHandler,
        user,
        visible,
        isLogginOut
    }
}