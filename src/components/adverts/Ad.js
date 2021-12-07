import React from 'react'
import ReactMarkdown from 'react-markdown'

import { adContent } from './Ad.md.js'

function Ad() {
    return (
        <div className="flex rounded gray-border shadow bg-white mx-4 mb-4">
            <div className="no-escape p-4">
                <ReactMarkdown className="prose" children={adContent} />
            </div>
        </div>
    )
}

export default Ad
