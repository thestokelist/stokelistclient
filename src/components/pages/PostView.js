import React, { useEffect, useState, Fragment } from 'react'
import PostDetail from '../posts/PostDetail'
import { endpoints } from '../../constants/endpoints'
import { apiGet } from '../../util/network'

function PostView({ match }) {
    const postID = match.params.id
    const [postDetails, setPostDetails] = useState(null)

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
            {postDetails === null ? (
                <div>Loading...</div>
            ) : (
                <PostDetail postDetails={postDetails} />
            )}
        </Fragment>
    )
}

export default PostView
