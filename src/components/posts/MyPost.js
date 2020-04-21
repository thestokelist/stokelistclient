import React, { useState } from 'react'

import { SmallGreyWhiteButton } from '../shared/Buttons'
import { AlignRight } from '../shared/Layouts'
import PostSummary from './PostSummary'

function MyPost({ post }) {
    const deletePost = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/posts/${post.id}`,
            { method: 'DELETE', credentials: 'include' }
        )
        if (response.status === 204) {
            setDeleted(true)
        } else {
            console.log(`Delete failed for post with id ${post.id}`)
        }
    }

    const [deleted, setDeleted] = useState(false)

    return (
        <div>
            {deleted ? (
                <div>
                    <PostSummary post={post} disabled={true} />
                    <AlignRight><div>This post has been deleted</div></AlignRight>
                </div>
            ) : (
                <div>
                    <PostSummary post={post} />
                    <AlignRight>
                        <SmallGreyWhiteButton onClick={deletePost}>
                            Delete
                        </SmallGreyWhiteButton>
                    </AlignRight>
                </div>
            )}
        </div>
    )
}

export default MyPost
