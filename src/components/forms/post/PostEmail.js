import React from 'react'
import validator from 'email-validator'

import {
    Label,
    FormError,
    InputContainer,
    SubLabel,
    HalfWidthInput
} from '../../shared/Forms'

function PostEmail({ errors, register, watch }) {

    const validateEmail = () => {
        const email = watch('email')
        return validator.validate(email)
    }

    return (
        <InputContainer>
                <Label>
                    Your Contact Email
                    <SubLabel> - This will not be published</SubLabel>
                </Label>
                <HalfWidthInput
                    type="email"
                    name="email"
                    ref={register({
                        required: true,
                        validate: validateEmail,
                    })}
                />
                <FormError>
                    {errors.email &&
                        errors.email.type === 'required' &&
                        'Email is required.'}
                    {errors.email &&
                        errors.email.type === 'validate' &&
                        'Must be an email address.'}
                </FormError>
            </InputContainer>
    )
}

export default PostEmail
