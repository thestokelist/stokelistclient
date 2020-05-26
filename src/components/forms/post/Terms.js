import React from 'react'
import {
    RadioInput,
    RadioText,
    FormError,
    InputContainer,
} from '../../shared/Forms'

function Terms({ errors, register }) {
    return (
        <InputContainer>
            <RadioInput
                type="checkbox"
                name="terms"
                ref={register({required: true})}
            />
            <RadioText>
                I accept the Terms of Service & Privacy Policy
            </RadioText>
            <FormError>
                {errors.terms &&
                    'You must accept the Terms and Conditions'}
            </FormError>
        </InputContainer>
    )
}

export default Terms
