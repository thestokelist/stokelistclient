import React, { useState, Fragment } from 'react'

import { Title } from '../shared/Text'
import PostDetails from '../posts/PostDetail'
import Post from '../forms/Post'

function PostCreate() {
    const [postDetails, setPostDetails] = useState(null)
    const [postSubmitted, setPostSubmitted] = useState(false)

    return (
        <Fragment>
            <Title>Create Post</Title>
            {postSubmitted ? (
                <PostDetails postDetails={postDetails} />
            ) : (
                <Post setPostDetails={setPostDetails} setPostSubmitted={setPostSubmitted} />
            )}
        </Fragment>
    )
}

export default PostCreate
