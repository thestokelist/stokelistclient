import React from 'react'
import ReactMde from 'react-mde'
//Local version of this stylesheet
import '../../../styles/react-mde-toolbar.css'
import 'react-mde/lib/styles/css/react-mde-editor.css'
import 'react-mde/lib/styles/css/react-mde.css'
import ReactMarkdown from 'react-markdown'

import { useMountEffect } from '../../../hooks'

function PostDescription({ errors, register, setValue, watch }) {
    useMountEffect(() => {
        register({ name: 'description' }, { required: true })
    })

    const [selectedTab, setSelectedTab] = React.useState('write')

    return (
        <div className="form-input-container">
            <div className="form-label">
                Post Description
                <span className="hidden lg:inline form-sublabel">
                    {' '}
                    - Be descriptive, this will help your results show up in
                    search
                </span>
            </div>
            <div className="w-full lg:w-4/5">
                {' '}
                <ReactMde
                    value={watch('description')}
                    onChange={(value) => setValue('description', value)}
                    classes={{
                        preview:
                            'bg-white text-slate text-md px-4 py-2 w-full box-border',
                    }}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={(markdown) =>
                        Promise.resolve(
                            <ReactMarkdown
                                className="markdown"
                                children={markdown}
                            />
                        )
                    }
                    toolbarCommands={[
                        ['bold', 'italic', 'header'],
                        ['ordered-list', 'unordered-list'],
                    ]}
                />
            </div>

            <div className="form-error">
                {errors.description && 'Description is required.'}
            </div>
        </div>
    )
}

export default PostDescription
