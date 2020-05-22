import React, { useMemo, Fragment } from 'react'
import styled from 'styled-components'
import PostSummary from '../posts/PostSummary'
import { Title } from '../shared/Text'

const PostSectionContainer = styled.div`
    margin: 20px 0;
    width: 100%;
    display: flex;
    flex-direction:column; 
`

const PostDateHeader = styled(Title)`
    color: #434653;
`

function PostSection({ title, children, posts, hideEmpty, hideDates }) {

    const getDateLabel = (init,differenceInDays) => {
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
            let createdDateString = getDateLabel(postDate.toDateString(),differenceInDays)

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
            postSummaries = <div>No Results Found</div>
        } else {
            postSummaries = postArray.map((post) => (
                <PostSummary post={post} key={post.id} />
            ))
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
                    <Title>{title}</Title>
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