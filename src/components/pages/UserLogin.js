import React, { useState } from 'react'
import queryString from 'query-string'
import { Redirect } from 'react-router'

import { setCookies } from '../../util/cookies'
import { useMountEffect } from  '../../hooks'
import { endpointFunctions } from '../../constants/endpoints'
import { apiPost } from '../../util/network'

function UserLogin({ match, location }) {
    const loginToken = match.params.uuid
    const parsed = queryString.parse(location.search)
    const [loggedIn, setLoggedIn] = useState(null)

    useMountEffect(() => {
        async function login() {
            console.log(`Logging in with login token: ${loginToken}`)
            const bodyObject = { email: parsed.email }
            const res = await apiPost(endpointFunctions.LOGIN(loginToken),bodyObject)
            if (res) {
                console.log(`Logged in with login token: ${loginToken}`)
                const hmac = await res.text()
                setCookies(parsed.email,loginToken,hmac)
                setLoggedIn(true)
            } else {
                console.log(`Login failed with login token: ${loginToken}`)
                setLoggedIn(false)
            }
        }
        login()
    })

    const generateText = () => {
        if (loggedIn === null) {
            return <div>Logging in...</div>
        } else if (loggedIn === false) {
            return <div>Login Failed</div>
        } else if (loggedIn === true) {
            return <Redirect to="/myposts" />
        }
    }

    return generateText()
}

export default UserLogin
