import React, { useState, Fragment, useContext } from 'react'

import { Title } from '../shared/Text'
import { Flash } from '../shared/Layouts'
import PostDetail from '../posts/PostDetail'
import { useMountEffect } from '../../hooks'
import { endpoints } from '../../constants/endpoints'
import { apiPost } from '../../util/network'
import { actionTypes } from '../../constants/actions'
import { store } from '../store'

function PostValidate({ match }) {
    const postUUID = match.params.uuid
    const [postDetails, setPostDetails] = useState(null)
    const { dispatch } = useContext(store)

    useMountEffect(() => {
        async function fetchData() {
            console.log(`Validating post with UUID: ${postUUID}`)
            const response = await apiPost(`${endpoints.VALIDATE}/${postUUID}`)
            console.log(response)
            if (response) {
                const responseObject = await response.json()
                setPostDetails(responseObject.post)
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    item: {
                        token: responseObject.token,
                        email: responseObject.post.email,
                    },
                })
            }
        }
        fetchData()
    })

    return (
        <Fragment>
            {postDetails === null ? (
                <Fragment>
                    <Title>Validate Post</Title>
                    <div>Validating...</div>
                </Fragment>
            ) : (
                <Fragment>
                    <Flash>
                        Your email has been verified, you'll see your post on
                        the Stoke List soon
                    </Flash>
                    <PostDetail postDetails={postDetails} />
                </Fragment>
            )}
        </Fragment>
    )
}

export default PostValidate
