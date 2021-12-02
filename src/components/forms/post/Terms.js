import React from 'react'

function Terms({ errors, register }) {
    return (
        <div className="form-input-container">
            <input
                type="checkbox"
                name="terms"
                ref={register({ required: true })}
            />
            <span text="form-radio-text">
                I accept the{' '}
                <a target="_blank" href="/terms">
                    Terms of Service & Privacy Policy
                </a>
            </span>
            <div className="form-error">
                {errors.terms &&
                    'You must accept the Terms of Service & Privacy Policy'}
            </div>
        </div>
    )
}

export default Terms
