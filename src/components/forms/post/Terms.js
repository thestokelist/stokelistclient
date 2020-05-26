import React from 'react'
import { Link } from 'react-router-dom'
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
                <Link>I Accept Terms of Service & Privacy Policy</Link>
            </RadioText>
            <FormError>
                {errors.terms &&
                    'You must accept the Terms and Conditions'}
            </FormError>
        </InputContainer>
    )
}

export default Terms
