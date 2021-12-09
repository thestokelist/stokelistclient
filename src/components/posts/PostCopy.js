import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaPaperclip } from 'react-icons/fa'

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
                <div className="text-slate font-bold mx-4">
                    Email Address Copied!
                </div>
            ) : (
                <CopyToClipboard
                    text={postEmail}
                    onCopy={() => setEmailCopied(true)}
                >
                    <div className="underline text-blue mx-4 mb-2 text-center">
                        <FaPaperclip color={'#175e88'} />
                        Copy Email Address
                    </div>
                </CopyToClipboard>
            )}
        </div>
    )
}

export default PostDetail
