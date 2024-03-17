import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import Loading from '../shared/Loading'
import PostForm from '../forms/PostForm'
import { endpoints } from '../../constants/endpoints'
import { useNetworkRequest, useMountEffect } from '../../hooks'

function PostEdit({ match }) {
    const postID = match.params.id
    const [postDetails, setPostDetails] = useState(null)
    const [postUpdated, setPostUpdated] = useState(false)
    const { apiGet } = useNetworkRequest()

    useMountEffect(() => {
        async function loadPost() {
            console.log('Loading post details')
            const {success, response} = await apiGet(`${endpoints.POSTS}${postID}`)
            if (success) {
                const post = await response.json()
                setPostDetails(post)
            }
        }
        loadPost()
    })

    return (
        <Fragment>
            <div className="my-4 title">Edit Post</div>
            {postUpdated ? (
                <Redirect to={`/post/${postID}`} />
            ) : postDetails ? (
                <PostForm
                    post={postDetails}
                    responseCallback={setPostUpdated}
                    buttonText="Update"
                    editMode={true}
                />
            ) : (
                <Loading />
            )}
        </Fragment>
    )
}

export default PostEdit
