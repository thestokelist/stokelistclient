import React, { useState, Fragment } from 'react'

import { Title } from '../shared/Text'
import { Flash } from '../shared/Layouts'
import PostDetail from '../posts/PostDetail'
import { setCookies } from '../../util/cookies'
import { useMountEffect } from '../../hooks'
import { endpointFunctions } from '../../constants/endpoints'
import { apiPost } from '../../util/network'

function PostValidate({ match }) {
    const postUUID = match.params.uuid
    const [postDetails, setPostDetails] = useState(null)

    useMountEffect(() => {
        async function fetchData() {
            console.log(`Validating post with UUID: ${postUUID}`)
            const response = await apiPost(endpointFunctions.VALIDATE(postUUID))
            console.log(response)
            if (response) {
                const responseObject = await response.json()
                setPostDetails(responseObject.post)
                setCookies(responseObject.post.email, postUUID, responseObject.hmac)
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
