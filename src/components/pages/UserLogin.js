import React, { useState, useContext } from 'react'
import queryString from 'query-string'
import { useHistory } from 'react-router-dom'

import { useMountEffect } from '../../hooks'
import { endpoints } from '../../constants/endpoints'
import { store } from '../store'
import { actionTypes } from '../../constants/actions'
import { useNetworkRequest } from '../../hooks'

function UserLogin({ match, location }) {
    const loginToken = match.params.uuid
    const parsed = queryString.parse(location.search)
    const { dispatch } = useContext(store)
    const [loginError, setLoginError] = useState(false)
    const history = useHistory()
    const { apiPost } = useNetworkRequest()

    useMountEffect(() => {
        async function login() {
            console.log(`Logging in with login token: ${loginToken}`)
            const bodyObject = { email: parsed.email }
            const {success, response} = await apiPost(
                `${endpoints.LOGIN}/${loginToken}`,
                bodyObject
            )
            if (success) {
                console.log(`Logged in with login token: ${loginToken}`)
                const token = await response.text()
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    item: {
                        token: token,
                        email: parsed.email,
                    },
                })
                history.push('/myposts')
            } else {
                console.log(`Login failed with login token: ${loginToken}`)
                setLoginError(true)
            }
        }
        login()
    })

    return loginError ? <div>Login failed</div> : <div>Logging in...</div>
}

export default UserLogin
