import React, { useState } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaPaperclip } from 'react-icons/fa'

import { CenteredWhiteBlueButton } from '../shared/Buttons'
import { FlexFullHeightColumn } from '../shared/Layouts'


const CopyLink = styled.div`
    font-size: 1em;
    text-decoration: underline;
    color: #175e88;
    margin: 10px auto;
    text-align: center;
`

const CopiedText = styled.div`
    font-size: 1em;
    color: #434653;
    font-weight: bold;
    margin: 10px auto;
`

function PostDetail({ postDetails }) {
    const post = postDetails

    const [emailCopied, setEmailCopied] = useState(false)



    const replyToPost = () => {
        window.location.href = `mailto:list-${post.id}@thestoke.ca`
    }

    return <FlexFullHeightColumn>
                    <CenteredWhiteBlueButton onClick={replyToPost}>
                        Reply to Post
                    </CenteredWhiteBlueButton>
                    {emailCopied ? (
                        <CopiedText>Email Address Copied!</CopiedText>
                    ) : (
                        <CopyToClipboard
                            text={`list-${post.id}@thestoke.ca`}
                            onCopy={() => setEmailCopied(true)}
                        >
                            <CopyLink>
                                <FaPaperclip color={'#175e88'} />
                                Copy Email Address
                            </CopyLink>
                        </CopyToClipboard>
                    )}
                </FlexFullHeightColumn>
         
}

export default PostDetail
