import React, { useState, useContext } from 'react'

import { store } from '../store'
import PostSection from '../posts/PostSection'
import PostSearch from '../posts/PostSearch'
import Loading from '../shared/Loading'
import { usePosts, useMountEffect } from '../../hooks'
import { endpoints } from '../../constants/endpoints'

function PostList() {
    const [latestPosts, loadLatestPosts] = usePosts(endpoints.POSTS)
    const [stickyPosts, loadStickyPosts] = usePosts(endpoints.STICKY)
    const [loading, setLoading] = useState(true)
    const { state } = useContext(store)

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
                adminMode={state.isAdmin === true}
            >
                <button className="btn-white my-0 mx-auto" onClick={loadLatestPosts}>
                    Show More
                </button>
            </PostSection>
        </PostSearch>
    )
}

export default PostList
