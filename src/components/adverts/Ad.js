import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import { adContent } from './Ad.md.js'

const AdvertContainer = styled.div`
    display: flex;
    margin: 10px 0;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 1px 1px 5px #0000001a;
    border: 1px solid #dce2e8;
    border-radius: 5px;
`

function Ad() {
    return (
        <AdvertContainer>
            <div className="no-escape">
                <ReactMarkdown children={adContent} />
            </div>
        </AdvertContainer>
    )
}

export default Ad
