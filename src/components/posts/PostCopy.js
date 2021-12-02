import React, { useState } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaPaperclip } from 'react-icons/fa'

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

    const email = process.env.REACT_APP_EMAIL
    const postEmail = `${email.split('@')[0]}+${post.id}@${email.split('@')[1]}`

    const [emailCopied, setEmailCopied] = useState(false)

    const replyToPost = () => {
        window.location.href = `mailto:${postEmail}`
    }

    return (
        <div className="flexed-column">
            <button className="btn-white mx-auto my-0" onClick={replyToPost}>
                Reply to Post
            </button>
            {emailCopied ? (
                <CopiedText>Email Address Copied!</CopiedText>
            ) : (
                <CopyToClipboard
                    text={postEmail}
                    onCopy={() => setEmailCopied(true)}
                >
                    <CopyLink>
                        <FaPaperclip color={'#175e88'} />
                        Copy Email Address
                    </CopyLink>
                </CopyToClipboard>
            )}
        </div>
    )
}

export default PostDetail
