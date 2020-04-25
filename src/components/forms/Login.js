import React from 'react'
import { useForm } from 'react-hook-form'
import validator from 'email-validator'
import ReactModal from 'react-modal'
import { useModal } from 'react-modal-hook'

import { Title } from '../shared/Text'
import { Input } from '../shared/Forms'
import { BigGreyButton, GreyWhiteButton } from '../shared/Buttons'
import { AlignRight } from '../shared/Layouts'
import { endpoints } from '../../constants/endpoints'
import { apiPost } from '../../util/network'

function Login() {
    const { register, handleSubmit, errors, watch } = useForm()
    const [showModal, hideModal] = useModal(() => (
        <ReactModal isOpen>
            <Title>Login Email Sent</Title>
            To login, please check your email and click on the link - no
            passwords required!
            <AlignRight>
                <GreyWhiteButton onClick={hideModal}>
                    I Understand
                </GreyWhiteButton>
            </AlignRight>
        </ReactModal>
    ))

    const onSubmit = async (data) => {
        const postData = { email: data.email }
        const response = await apiPost(endpoints.LOGIN, postData)
        if (response) {
            showModal()
        }
    }

    const getLoginForm = () => {
        return (
            <div>
                <div>
                    To see your posts you must login. To login, enter your email
                    address below and we'll email you a login link
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type="email"
                        name="email"
                        ref={register({
                            required: true,
                            validate: validateEmail,
                        })}
                    />
                    {errors.email &&
                        errors.email.type === 'required' &&
                        'Email is required.'}
                    {errors.email &&
                        errors.email.type === 'validate' &&
                        'Must be an email address.'}
                    <BigGreyButton type="submit">Login</BigGreyButton>
                </form>
            </div>
        )
    }

    const validateEmail = () => {
        const email = watch('email')
        return validator.validate(email)
    }

    return getLoginForm()
}

export default Login
