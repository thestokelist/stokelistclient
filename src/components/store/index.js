//This is our global state handler - way easier than Redux for a small application
import React, { createContext, useReducer, useEffect } from 'react'
import { actionTypes } from '../../constants/actions'
import jwt from 'jsonwebtoken'

//Read in state from local storage
const localState = localStorage.getItem('state')
    ? JSON.parse(localStorage.getItem('state'))
    : null

const initialState = {
    loggedIn: false,
    isAdmin: false,
    email: null,
    token: null,
}
const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children, init }) => {
    //Our state reducer, which handles all actions defined in our actions constants
    const [state, dispatch] = useReducer((state, action) => {
        let newState
        switch (action.type) {
            case actionTypes.LOGIN_SUCCESS:
                newState = {
                    ...state,
                    loggedIn: true,
                    email: action.item.email,
                    token: action.item.token,
                    isAdmin: jwt.decode(action.item.token).admin === true
                }
                return newState
            case actionTypes.LOGOUT:
                newState = { ...state, loggedIn: false, email: null, token: null, isAdmin: false }
                return newState
            default:
                throw new Error()
        }
        //If we were passed a state, use that
        //else use local state if we can, fall back to initial state
    }, init || localState || initialState)

    //Persist our state to local storage every time we update
    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state))
    }, [state])

    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
