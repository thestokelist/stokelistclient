import React from 'react'

import PostSection from '../posts/PostSection'
import PostSearch from '../posts/PostSearch'
import { usePosts, useMountEffect } from '../../hooks'
import { CenteredWhiteBlueButton } from '../shared/Buttons'
import { endpoints } from '../../constants/endpoints'

function PostList() {
    const [latestPosts, loadLatestPosts] = usePosts(endpoints.POSTS)
    const [stickyPosts, loadStickyPosts] = usePosts(endpoints.STICKY)

    useMountEffect(() => {
        loadLatestPosts()
        loadStickyPosts()
    })

    return <PostSearch>
                <PostSection
                    title="Sticky Posts"
                    posts={stickyPosts}
                    hideEmpty={true}
                    hideDates={true}
                />
                <PostSection
                    title="Latest Posts"
                    posts={latestPosts}
                    hideEmpty={false}
                >
                    <CenteredWhiteBlueButton onClick={loadLatestPosts}>
                        Show More
                    </CenteredWhiteBlueButton>
                </PostSection>
            </PostSearch>
}

export default PostList
