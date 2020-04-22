import React, { useEffect, useState } from 'react'

import { Title } from '../shared/Text'
import { Flash } from '../shared/Layouts'
import PostDetail from '../posts/PostDetail'
import { setCookies } from '../util/cookies'

function PostValidate({ match }) {
    const postUUID = match.params.uuid
    const [postDetails, setPostDetails] = useState(null)

    useEffect(() => {
        async function fetchData() {
            console.log(`Validating post with UUID: ${postUUID}`)
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/posts/v/${postUUID}`,
                { method: 'POST' }
            )
            const responseObject = await response.json()
            setPostDetails(responseObject.post)
            setCookies(responseObject.post.email, postUUID, responseObject.hmac)
        }
        fetchData()
        //remove any dependencies to force a single load
        //eslint-disable-next-line
    }, [])
    return (
        <div>
            {postDetails === null ? (
                <div>
                    <Title>Validate Post</Title>
                    <div>Validating...</div>
                </div>
            ) : (
                <div>
                    <Flash>
                        Your email has been verified, you'll see your post on
                        the Stoke List soon
                    </Flash>
                    <PostDetail postDetails={postDetails} />
                </div>
            )}
        </div>
    )
}

export default PostValidate
