import React, { useState, Fragment, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { Title } from '../shared/Text'
import Post from '../forms/Post'
import { endpoints } from '../../constants/endpoints'
import { apiGet } from '../../util/network'

function PostEdit({ match }) {
    const postID = match.params.id
    const [postDetails, setPostDetails] = useState(null)
    const [postUpdated, setPostUpdated] = useState(false)

    useEffect(() => {
        async function loadPost() {
            console.log('Loading post details')
            const res = await apiGet(`${endpoints.POSTS}${postID}`)
            if (res) {
                const post = await res.json()
                setPostDetails(post)
            }
        }
        loadPost()
    }, [postID])

    return (
        <Fragment>
            <Title>Edit Post</Title>
            {postUpdated ? (
                <Redirect to={`/post/${postID}`} />
            ) : postDetails ? (
                <Post
                    post={postDetails}
                    responseCallback={setPostUpdated}
                    buttonText="Update"
                />
            ) : (
                <div>Loading...</div>
            )}
        </Fragment>
    )
}

export default PostEdit
