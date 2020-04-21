import React, { useEffect, useState } from 'react'
import PostDetail from '../posts/PostDetail'

function PostView({ match }) {
    const postID = match.params.id
    //eslint-disable-next-line
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
        <div>
            {postDetails === null ? (
                <div>Loading...</div>
            ) : (
                <PostDetail postDetails={postDetails} />
            )}
        </div>
    )
}

export default PostView
