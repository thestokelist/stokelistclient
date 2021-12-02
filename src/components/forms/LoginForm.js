import React from 'react'
import { useForm } from 'react-hook-form'
import validator from 'email-validator'

import { endpoints } from '../../constants/endpoints'
import { useNetworkRequest } from '../../hooks'

function LoginForm({emailSent}) {

    const { apiPost } = useNetworkRequest()
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
    <div className="form-input-container">
        <input  
            className="form-input"
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
    </div>

    <button className="btn-blue" type="submit">Login</button>
</form>
}

export default LoginForm
