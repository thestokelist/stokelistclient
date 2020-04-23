import React, { useEffect, useState, Fragment } from 'react'
import PostDetail from '../posts/PostDetail'

function PostView({ match }) {
    const postID = match.params.id
    const [postDetails, setPostDetails] = useState(null)

    useEffect(() => {
        async function loadPost() {
            console.log('Loading post details')
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/posts/${postID}`
            )
            const post = await res.json()
            setPostDetails(post)
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
