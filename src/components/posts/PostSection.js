import React, { useMemo, Fragment } from 'react'
import PostSummary from '../posts/PostSummary'
import MyPost from '../posts/MyPost'
import Ad from '../adverts/Ad'

function PostSection({
    children,
    title,
    titleButton,
    posts,
    hideEmpty,
    emptyText,
    hideDates,
    adminMode,
    numbered,
    includeAds,
    highlightFirst,
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

        for (const post of posts) {
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

    //Display an array of posts
    const getPostSummaryList = (postArray) => {
        let postSummaries
        if (posts.length === 0) {
            postSummaries = <div>{emptyText}</div>
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

    //Display the posts, grouped by date
    const displayPostsByDate = (postMap) => {
        //We only handle adverts here, because they only happen on pages grouped by date
        let adCounter = 0
        let adInserted = false
        return [...postMap.keys()].map((date) => {
            const postGroup = getPostSummaryList(postMap.get(date))
            if (adCounter === 0 && highlightFirst) {
                postGroup[0] = <div className="fadeIn">{postGroup[0]}</div>
            }
            if (includeAds && !adInserted) {
                //Insert a single advert after the 3rd post, if there is one
                if (adCounter + postGroup.length > 3) {
                    const spliceIndex = 3 - adCounter
                    postGroup.splice(spliceIndex, 0, <Ad key={'ad'} />)
                    adInserted = true
                } else {
                    adCounter += postGroup.length
                }
            }
            return (
                <Fragment key={date}>
                    {date && (
                        <div className="text-2xl font-medium text-slate">
                            {date}
                        </div>
                    )}
                    <div className="mt-4 mb-8">{postGroup}</div>
                </Fragment>
            )
        })
    }

    return posts.length === 0 && hideEmpty === true ? null : (
        <div className="flex flex-col w-full mb-4">
            <div className="flexed-row justify-between">
                <div className="title">{title}</div>
                {titleButton}
            </div>

            {hideDates === true
                ? <div className="mt-2 lg:mt-4">{getPostSummaryList(posts)}</div>
                : displayPostsByDate(groupedPosts)}
            {children}
        </div>
    )
}

PostSection.defaultProps = {
    emptyText: 'No Posts Found',
}

export default PostSection
