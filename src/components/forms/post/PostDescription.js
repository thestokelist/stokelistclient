import React from 'react'
import styled from 'styled-components'
import {
    Label,
    SubLabel,
    FormError,
    InputContainer
} from '../../shared/Forms'

const Description = styled.textarea`
    width: 80%;
`

function PostDescription({ errors, register }) {
    return (
        <InputContainer>
        <Label>
            Post Description
            <SubLabel>
                - Be descriptive, this will help your results show up in search
            </SubLabel>
        </Label>
        <Description
            rows="10"
            cols="80"
            name="description"
            ref={register({ required: true })}
        />
        <FormError>
            {errors.description && 'Description is required.'}
        </FormError>
    </InputContainer>
    )
}

export default PostDescription
