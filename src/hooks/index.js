import { useState, useEffect, useReducer, useContext } from 'react'
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
        const response = await apiGet(endpoint, { offset: currentOffset })
        if (response) {
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
            response = null
        } else if (isNotOK) {
            console.log(
                `Error occured whilst attempting ${method} to ${response.url}: ${response.statusText}`
            )
            response = null
        }
        return response
    }

    const tokenHeaders = (token) => {
        return Object.assign(standardHeaders, {
            Authorization: `Bearer ${token}`,
        })
    }

    const apiPost = async (endpoint, data) => {
        let response = await fetch(apiUrl + endpoint, {
            method: 'POST',
            headers: standardHeaders,
            body: JSON.stringify(data),
        })
        response = await handleErrors(response, 'POST')
        return response
    }

    const authApiMultipartPost = async (endpoint, data) => {
        let response = await fetch(apiUrl+'/upload', {
            method: 'POST',
            body: data,
        })
        response = await handleErrors(response, 'POST')
        return response
    }



    const authApiGet = async (endpoint, token) => {
        let response = await fetch(apiUrl + endpoint, {
            method: 'GET',
            headers: tokenHeaders(token),
        })
        response = await handleErrors(response, 'GET')
        return response
    }

    const apiGet = async (endpoint, params) => {
        console.log(endpoint)
        let response = await fetch(
            `${apiUrl}${endpoint}?${queryString.stringify(params)}`,
            {
                method: 'GET',
                headers: standardHeaders,
            }
        )
        response = await handleErrors(response, 'GET')
        return response
    }

    const authApiDelete = async (endpoint, token) => {
        let response = await fetch(apiUrl + endpoint, {
            method: 'DELETE',
            headers: tokenHeaders(token),
        })
        response = await handleErrors(response, 'DELETE')
        return response
    }

    const authApiPut = async (endpoint, data, token) => {
        let response = await fetch(apiUrl + endpoint, {
            method: 'PUT',
            headers: tokenHeaders(token),
            body: JSON.stringify(data),
        })
        response = await handleErrors(response, 'PUT')
        return response
    }

    const authApiPatch = async (endpoint, token) => {
        let response = await fetch(apiUrl + endpoint, {
            method: 'PATCH',
            headers: tokenHeaders(token),
        })
        response = await handleErrors(response, 'PATCH')
        return response
    }

    return {
        apiGet,
        apiPost,
        authApiGet,
        authApiPatch,
        authApiPut,
        authApiDelete,
        authApiMultipartPost,
    }
}
