import React from 'react'
import styled from 'styled-components'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import ReactMarkdown from 'react-markdown'

import { Label, SubLabel, FormError, InputContainer } from '../../shared/Forms'
import { useMountEffect } from '../../../hooks'

const MDEContainer = styled.div`
    width: 80%;
`

function PostDescription({ errors, register, setValue, watch }) {

    useMountEffect(() => {
        register({ name: 'description' }, { required: true })
    })
    
    const [selectedTab, setSelectedTab] = React.useState("write");

    return (
        <InputContainer>
            <Label>
                Post Description
                <SubLabel>
                    - Be descriptive, this will help your results show up in
                    search
                </SubLabel>
            </Label>
            <MDEContainer>
                {' '}
                <ReactMde
                    value={watch('description')}
                    onChange={(value) => setValue('description', value)}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={(markdown) =>
                        Promise.resolve(<ReactMarkdown children={markdown} />)
                    }
                    toolbarCommands = {[["bold","italic","header","strikethrough"], ["code","quote","link"],["ordered-list","unordered-list","checked-list"]]}
                           
                />
            </MDEContainer>

            <FormError>
                {errors.description && 'Description is required.'}
            </FormError>
        </InputContainer>
    )
}

export default PostDescription
