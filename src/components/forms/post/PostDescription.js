import React from 'react'
import styled from 'styled-components'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import ReactMarkdown from 'react-markdown'

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
        <div className="form-input-container">
            <div className="form-label">
                Post Description
                <span className="form-sublabel">
                    - Be descriptive, this will help your results show up in
                    search
                </span>
            </div>
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

            <div className="form-error">
                {errors.description && 'Description is required.'}
            </div>
        </div>
    )
}

export default PostDescription
