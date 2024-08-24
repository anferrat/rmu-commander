import { createSlice } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux"

interface GlobalState {
    isLoggedIn: boolean
    user: string | null
    userId: string | null,
    defaultCompanyId: string | null
}

interface RootState {
    global: GlobalState
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

const globalState = createSlice({
    name: 'global',
    initialState: {
        isLoggedIn: false,
        user: null,
        userId: null,
        defaultCompanyId: null,
    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
            if (!action) {
                state.user = null
                state.userId = null
                state.defaultCompanyId = null
            }
        },
        setUser: (state, action) => {
            state.user = action.payload.user
            state.userId = action.payload.userId
            state.defaultCompanyId = action.payload.defaultCompanyId
        }
    }

})

export default globalState.reducer

//Actions
export const { setIsLoggedIn, setUser } = globalState.actions
