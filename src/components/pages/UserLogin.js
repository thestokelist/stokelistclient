import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { Redirect } from 'react-router'

import { setCookies } from '../shared/Functions'

function UserLogin({ match, location }) {
    const loginToken = match.params.uuid
    const parsed = queryString.parse(location.search)
    const [loggedIn, setLoggedIn] = useState(null)

    useEffect(() => {
        async function login() {
            console.log(`Logging in with login token: ${loginToken}`)
            const bodyObject = { email: parsed.email }
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/login/${loginToken}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bodyObject),
                }
            )
            if (res.status === 200) {
                const hmac = await res.text()
                setCookies(parsed.email,loginToken,hmac)
                setLoggedIn(true)
            } else {
                console.log('Login failed')
                setLoggedIn(false)
            }
        }
        login()
        //Only run once
        //eslint-disable-next-line
    }, [])

    const generateText = () => {
        if (loggedIn === null) {
            return <div>Logging in...</div>
        } else if (loggedIn === false) {
            return <div>Login Failed</div>
        } else if (loggedIn === true) {
            return <Redirect to="/myposts" />
        }
    }

    return <div>{generateText()}</div>
}

export default UserLogin
