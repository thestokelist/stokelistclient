import React from 'react'
import styled from 'styled-components'
import { Label, Input, FormError, InputContainer } from '../../shared/Forms'

const WideInput = styled(Input)`
    width: 80%;
`

function PostTitle({ errors, register }) {
    return (
        <InputContainer>
            <Label>Post Title</Label>
            <WideInput
                name="title"
                placeholder="Max 50 characters"
                ref={register({ required: true, maxLength: 50 })}
            />
            <FormError>
                {' '}
                {errors.title &&
                    errors.title.type === 'required' &&
                    'Post Title is required.'}
                {errors.title &&
                    errors.title.type === 'maxLength' &&
                    'Post Title has a max length of 50 characters.'}
            </FormError>
        </InputContainer>
    )
}

export default PostTitle
