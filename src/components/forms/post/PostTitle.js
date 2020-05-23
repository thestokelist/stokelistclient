import React from 'react'
import styled from 'styled-components'
import { Label, Input, FormError, InputContainer } from '../../shared/Forms'

const WideInput = styled(Input)`
    width: 80%;
`

function PostTitle({ errors, register, watch }) {
    const validateYelling = () => {
        const title = watch('title')
        const upperCaseCount = title.replace(/[^A-Z]/g, '').length
        const lowerCaseCount = title.replace(/[^a-z]/g, '').length
        if (upperCaseCount > 0 && upperCaseCount > lowerCaseCount) {
            return false
        } else {
            return true
        }
    }

    return (
        <InputContainer>
            <Label>Post Title</Label>
            <WideInput
                name="title"
                placeholder="Max 50 characters"
                ref={register({
                    required: true,
                    maxLength: 50,
                    validate: validateYelling,
                })}
            />
            <FormError>
                {' '}
                {errors.title &&
                    errors.title.type === 'required' &&
                    'Post Title is required.'}
                {errors.title &&
                    errors.title.type === 'maxLength' &&
                    'Post Title has a max length of 50 characters.'}
                {errors.title &&
                    errors.title.type === 'validate' &&
                    'Your post title can’t be created with the CAPS LOCK on; it looks like you’re yelling.'}
            </FormError>
        </InputContainer>
    )
}

export default PostTitle
