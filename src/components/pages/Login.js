import React, { useState, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import validator from 'email-validator'
import { Redirect } from 'react-router-dom'

import { Input, InputContainer } from '../shared/Forms'
import { BlueButton } from '../shared/Buttons'
import { endpoints } from '../../constants/endpoints'
import { apiPost } from '../../util/network'
import { Title } from '../shared/Text'

function Login() {
    const { register, handleSubmit, errors, watch } = useForm()
    const [emailSent, setEmailSent] = useState(false)

    const onSubmit = async (data) => {
        const postData = { email: data.email }
        const response = await apiPost(endpoints.LOGIN, postData)
        if (response) {
            setEmailSent(true)
        }
    }

    const getLoginForm = () => {
        return (
            <Fragment>
                <Title>Login</Title>
                <p>
                    To see your posts you must login. Enter your email
                    address below and we'll send you a login link
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <Input
                            type="email"
                            name="email"
                            ref={register({
                                required: true,
                                validate: validateEmail,
                            })}
                            placeholder="you@example.com"

                        />
                        {errors.email &&
                            errors.email.type === 'required' &&
                            'Email is required.'}
                        {errors.email &&
                            errors.email.type === 'validate' &&
                            'Must be an email address.'}
                    </InputContainer>

                    <BlueButton type="submit">Login</BlueButton>
                </form>
            </Fragment>
        )
    }

    const validateEmail = () => {
        const email = watch('email')
        return validator.validate(email)
    }

    return emailSent ? <Redirect to="/loginemail" /> : getLoginForm()
}

export default Login
