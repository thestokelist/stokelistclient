import React from 'react'

import MyPost from '../posts/MyPost'

function MyPostList({ posts }) {
    const getPostList = () => {
        let returnDiv = <div>Posts Loading...</div>
        if (posts && posts.length) {
            if (posts.length === 0) {
                returnDiv = <div>No posts found</div>
            } else {
                return posts.map((post) => <MyPost post={post} key={post.id} />)
            }
        }
        return returnDiv
    }

    return getPostList()
}

export default MyPostList
