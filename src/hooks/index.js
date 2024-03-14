import { useState, useEffect, useReducer, useContext, useRef } from 'react'
import { searchLoadReducer } from '../reducers'
import { actionTypes } from '../constants/actions'
import { store } from '../components/store'

export const usePosts = (endpoint) => {
    const [posts, setPosts] = useState([])
    const [offset, setOffset] = useState(null)
    const { apiGet } = useNetworkRequest()

    const loadMorePosts = async () => {
        const currentOffset = offset === null ? 0 : offset + 50
        setOffset(currentOffset)
        const {success, response} = await apiGet(endpoint, { offset: currentOffset })
        if (success) {
            const morePosts = await response.json()
            setPosts(posts.concat(morePosts))
        }
    }
    return [posts, loadMorePosts]
}

// eslint-disable-next-line
export const useMountEffect = (fun) => useEffect(fun, [])

export const useSearchReducer = () => {
    const initialState = [{ searchLoaded: false }, { searchLoading: false }]
    const [state, dispatch] = useReducer(searchLoadReducer, initialState)

    return [state, dispatch]
}

export const useNetworkRequest = () => {
    const queryString = require('query-string')

    const apiUrl = process.env.REACT_APP_API_URL

    const standardHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    const { dispatch } = useContext(store)

    const handleErrors = async (response, method) => {
        const isNotOK = await !response.ok
        if (response.status === 401) {
            //Request invalid with the token we presented, so logout
            dispatch({
                type: actionTypes.LOGOUT,
            })
            console.log('Token expired, logging out')
        } else if (isNotOK) {
            console.log(
                `Error occured whilst attempting ${method} to ${response.url}: ${response.statusText}`
            )
        }
        return { success: !isNotOK }
    }

    const tokenHeaders = (token) => {
        return Object.assign(standardHeaders, {
            Authorization: `Bearer ${token}`,
        })
    }

    const apiPost = async (endpoint, data) => {
        const response = await fetch(apiUrl + endpoint, {
            method: 'POST',
            headers: standardHeaders,
            body: JSON.stringify(data),
        })
        const success = await handleErrors(response, 'POST')
        return {success, response}
    }

    const authApiMultipartPost = async (endpoint, data) => {
        const response = await fetch(apiUrl + endpoint, {
            method: 'POST',
            body: data,
        })
        const success = await handleErrors(response, 'POST')
        return {success, response}
    }

    const authApiPost = async (endpoint, data, token) => {
        const response = await fetch(apiUrl + endpoint, {
            method: 'POST',
            headers: tokenHeaders(token),
            body: JSON.stringify(data),
        })
        const success = await handleErrors(response, 'POST')
        return {success, response}
    }

    const authApiGet = async (endpoint, token) => {
        const response = await fetch(apiUrl + endpoint, {
            method: 'GET',
            headers: tokenHeaders(token),
        })
        const success = await handleErrors(response, 'GET')
        return {success, response}
    }

    const apiGet = async (endpoint, params) => {
        const response = await fetch(
            `${apiUrl}${endpoint}?${queryString.stringify(params)}`,
            {
                method: 'GET',
                headers: standardHeaders,
            }
        )
        const success = await handleErrors(response, 'GET')
        return {success, response}
    }

    const authApiDelete = async (endpoint, token) => {
        const response = await fetch(apiUrl + endpoint, {
            method: 'DELETE',
            headers: tokenHeaders(token),
        })
        const success = await handleErrors(response, 'DELETE')
        return {success, response}
    }

    const authApiPut = async (endpoint, data, token) => {
        const response = await fetch(apiUrl + endpoint, {
            method: 'PUT',
            headers: tokenHeaders(token),
            body: JSON.stringify(data),
        })
        const success = await handleErrors(response, 'PUT')
        return {success, response}
    }

    const authApiPatch = async (endpoint, token) => {
        const response = await fetch(apiUrl + endpoint, {
            method: 'PATCH',
            headers: tokenHeaders(token),
        })
        const success = await handleErrors(response, 'PATCH')
        return {success, response}
    }

    return {
        apiGet,
        apiPost,
        authApiGet,
        authApiPatch,
        authApiPost,
        authApiPut,
        authApiDelete,
        authApiMultipartPost,
    }
}

export const useTimeout = (callback, delay) => {
    const timeoutRef = useRef(null)
    const savedCallback = useRef(callback)
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])
    useEffect(() => {
        const tick = () => savedCallback.current()
        if (typeof delay === 'number') {
            timeoutRef.current = window.setTimeout(tick, delay)
            return () => window.clearTimeout(timeoutRef.current)
        }
    }, [delay])
    return timeoutRef
}
