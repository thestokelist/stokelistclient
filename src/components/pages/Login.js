import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { Title } from '../shared/Text'
import LoginForm from '../forms/LoginForm'

function Login() {
    const [emailSent, setEmailSent] = useState(false)

    const emailSentHandler = () => {
        setEmailSent(true)
    }

    const getLoginForm = () => {
        return (
            <Fragment>
                <Title>Login</Title>
                <p>
                    To see your posts you must login. Enter your email
                    address below and we'll send you a login link
                </p>
                <LoginForm emailSent={emailSentHandler} />
            </Fragment>
        )
    }



    return emailSent ? <Redirect to="/loginemail" /> : getLoginForm()
}

export default Login
