import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { Title } from '../shared/Text'
import Post from '../forms/Post'

function PostCreate() {
    const [, setPostDetails] = useState(null)
    const [postSubmitted, setPostSubmitted] = useState(false)

    return (
        <Fragment>
            <Title>Create Post</Title>
            {postSubmitted ? (
                <Redirect to="/submitted" />
            ) : (
                <Post setPostDetails={setPostDetails} setPostSubmitted={setPostSubmitted} />
            )}
        </Fragment>
    )
}

export default PostCreate
