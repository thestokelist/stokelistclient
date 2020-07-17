import React, { useState } from 'react'

import PostSection from '../posts/PostSection'
import PostSearch from '../posts/PostSearch'
import Loading from '../shared/Loading'
import { usePosts, useMountEffect } from '../../hooks'
import { CenteredWhiteBlueButton } from '../shared/Buttons'
import { endpoints } from '../../constants/endpoints'

function PostList() {
    const [latestPosts, loadLatestPosts] = usePosts(endpoints.POSTS)
    const [stickyPosts, loadStickyPosts] = usePosts(endpoints.STICKY)
    const [loading, setLoading] = useState(true)

    useMountEffect(() => {
        const loadPosts = async () => {
            await Promise.allSettled([loadLatestPosts(), loadStickyPosts()])
            setLoading(false)
        }
        loadPosts()
    })

    return loading ? (
        <Loading />
    ) : (
        <PostSearch>
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
                includeAds={true}
            >
                <CenteredWhiteBlueButton onClick={loadLatestPosts}>
                    Show More
                </CenteredWhiteBlueButton>
            </PostSection>
        </PostSearch>
    )
}

export default PostList
