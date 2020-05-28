import React, { useMemo, Fragment } from 'react'
import styled from 'styled-components'
import PostSummary from '../posts/PostSummary'
import MyPost from '../posts/MyPost'
import { Title } from '../shared/Text'
import { FlexBetweenRow } from '../shared/Layouts'

const PostSectionContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const PostDateHeader = styled(Title)`
    color: #434653;
`

function PostSection({
    children,
    title,
    titleButton,
    posts,
    hideEmpty,
    hideDates,
    adminMode,
    numbered,
}) {
    const getDateLabel = (init, differenceInDays) => {
        let createdDate = init
        if (differenceInDays > 7 && differenceInDays <= 30) {
            createdDate = 'Older than a week'
        } else if (differenceInDays > 30 && differenceInDays <= 365) {
            createdDate = 'Older than a month'
        } else if (differenceInDays > 365) {
            createdDate = 'Older than a year'
        }
        return createdDate
    }
    //A map of posts, grouped by posting date
    const groupedPosts = useMemo(() => {
        const dateMap = new Map()

        //Get the current date, without any time component
        let currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)

        //Posts are ordered by creation date
        let dateString = null
        let postArray = []
        for (let post of posts) {
            const postDate = new Date(post.created_at.substring(0, 10))
            const differenceInDays = Math.floor(
                (currentDate - postDate) / (1000 * 60 * 60 * 24)
            )

            //Set the creation date string, which might not be a date
            let createdDateString = getDateLabel(
                postDate.toDateString(),
                differenceInDays
            )

            //Collect the posts, grouping by date string
            if (dateString !== createdDateString) {
                if (dateString) {
                    dateMap.set(dateString, postArray)
                }
                dateString = createdDateString
                postArray = [post]
            } else {
                postArray.push(post)
            }
        }
        dateMap.set(dateString, postArray)
        return dateMap
    }, [posts])

    const getPostSummaryList = (postArray) => {
        let postSummaries
        if (posts.length === 0) {
            postSummaries = <div>No Posts Found</div>
        } else {
            if (adminMode === true) {
                postSummaries = postArray.map((post) => (
                    <MyPost post={post} key={post.id} />
                ))
            } else {
                postSummaries = postArray.map((post, index) => (
                    <PostSummary
                        post={post}
                        key={post.id}
                        markerNumber={numbered && index + 1}
                    />
                ))
            }
        }
        return postSummaries
    }

    const displayPostsByDate = (postMap) => {
        return [...postMap.keys()].map((date) => {
            return (
                <Fragment key={date}>
                    <PostDateHeader>{date}</PostDateHeader>
                    {getPostSummaryList(postMap.get(date))}
                </Fragment>
            )
        })
    }

    const getPostSection = () => {
        if (posts.length === 0 && hideEmpty === true) {
            return null
        } else {
            return (
                <PostSectionContainer>
                    <FlexBetweenRow>
                        <Title>{title}</Title>
                        {titleButton}
                    </FlexBetweenRow>

                    {hideDates === true
                        ? getPostSummaryList(posts)
                        : displayPostsByDate(groupedPosts)}
                    {children}
                </PostSectionContainer>
            )
        }
    }

    return getPostSection()
}

export default PostSection
