import React from 'react'
import ReactMarkdown from 'react-markdown'

import { adContent } from './Ad.md.js'

function Ad() {
    return adContent ?
        <div className="flex rounded gray-border shadow bg-white mx-4 mb-4">
            <div className="no-escape p-4">
                <ReactMarkdown className="markdown" children={adContent} />
            </div>
        </div> : <div></div>
    
}

export default Ad
