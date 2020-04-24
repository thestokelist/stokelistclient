import React from 'react'
import styled from 'styled-components'
import PostSummary from '../posts/PostSummary'
import { Title } from '../shared/Text'

const PostSectionContainer = styled.div`
    margin: 20px 0;
`

function PostSection({ title, children, posts, hideEmpty }) {

    const getPostSection = () => {
        if (posts.length === 0 && hideEmpty === true) {
            return null
        } else if (posts.length === 0 && hideEmpty === false) {
            return <div>No Results Found</div>
        } else {
            return (
                <PostSectionContainer>
                    <Title>{title}</Title>
                    {posts.map((post) => (
                        <PostSummary post={post} key={post.id} />
                    ))}
                    {children}
                </PostSectionContainer>
            )
        }
    }

    return getPostSection()
}

export default PostSection
