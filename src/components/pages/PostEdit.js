import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import Loading from '../shared/Loading'
import PostForm from '../forms/PostForm'
import { endpoints } from '../../constants/endpoints'
import { formTypes } from '../../constants/forms'
import { useNetworkRequest, useMountEffect } from '../../hooks'

function PostEdit({ match }) {
    const postID = match.params.id
    const [postDetails, setPostDetails] = useState(null)
    const [postUpdated, setPostUpdated] = useState(false)
    const [formState, setFormState] = useState(formTypes.POST)
    const { apiGet } = useNetworkRequest()

    const getTitle = () => {
        let title = 'Edit Post'
        if (formState === formTypes.PREVIEW) {
            title = 'Preview Changes'
        }
        return title
    }

    useMountEffect(() => {
        async function loadPost() {
            console.log('Loading post details')
            const res = await apiGet(`${endpoints.POSTS}${postID}`)
            if (res) {
                const post = await res.json()
                setPostDetails(post)
            }
        }
        loadPost()
    })

    return (
        <Fragment>
            <div className="my-4 title">{getTitle()}</div>
            {postUpdated ? (
                <Redirect to={`/post/${postID}`} />
            ) : postDetails ? (
                <PostForm
                    post={postDetails}
                    responseCallback={setPostUpdated}
                    stateCallback={setFormState}
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
