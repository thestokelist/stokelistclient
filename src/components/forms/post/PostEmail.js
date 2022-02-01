import React from 'react'
import validator from 'email-validator'

function PostEmail({ errors, register, watch }) {
    const validateEmail = () => {
        const email = watch('email')
        return validator.validate(email)
    }

    return (
        <div className="form-input-container">
            <div className="form-label">
                Your Contact Email
                <span className="hidden lg:inline form-sublabel">{' - '}</span>
                <span className="block lg:inline form-sublabel">
                    This will not be published
                </span>
            </div>
            <input
                className="form-input lg:w-2/4 mr-4"
                type="email"
                name="email"
                ref={register({
                    required: true,
                    validate: validateEmail,
                })}
            />
            <div className="form-error">
                {errors.email &&
                    errors.email.type === 'required' &&
                    'Email is required.'}
                {errors.email &&
                    errors.email.type === 'validate' &&
                    'Must be an email address.'}
            </div>
        </div>
    )
}

export default PostEmail
