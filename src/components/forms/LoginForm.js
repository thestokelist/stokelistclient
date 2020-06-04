import React from 'react'
import { useForm } from 'react-hook-form'
import validator from 'email-validator'

import { Input, InputContainer } from '../shared/Forms'
import { BlueButton } from '../shared/Buttons'
import { endpoints } from '../../constants/endpoints'
import { apiPost } from '../../util/network'

function LoginForm({emailSent}) {
    const { register, handleSubmit, errors, watch } = useForm()

    const onSubmit = async (data) => {
        const postData = { email: data.email }
        const response = await apiPost(endpoints.LOGIN, postData)
        if (response) {
            emailSent()
        }
    }

    const validateEmail = () => {
        const email = watch('email')
        return validator.validate(email)
    }

    return  <form onSubmit={handleSubmit(onSubmit)}>
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
}

export default LoginForm
