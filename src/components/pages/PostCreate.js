import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { Title } from '../shared/Text'
import Post from '../forms/Post'

function PostCreate() {
    const [postDetails, setPostDetails] = useState(null)

    return (
        <Fragment>
            <Title>Create Post</Title>
            {postDetails ? (
                <Redirect to="/submitted" />
            ) : (
                <Post
                    responseCallback={setPostDetails}
                    buttonText="Submit"
                />
            )}
        </Fragment>
    )
}

export default PostCreate
