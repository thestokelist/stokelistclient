import React, { useState, useContext, Fragment } from 'react'
import styled from 'styled-components'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { Title } from '../shared/Text'
import { FormError } from '../shared/Forms'
import { WhiteBlueButton, WhiteRedButton } from '../shared/Buttons'
import {
    FlexRow,
    ButtonContainer,
    ResponsiveBetweenRow,
} from '../shared/Layouts'
import { endpoints } from '../../constants/endpoints'
import { store } from '../store'
import PostDetail from '../posts/PostDetail'
import PostReport from '../posts/PostReport'
import GrayableContainer from '../posts/GrayableContainer'
import { useNetworkRequest, useMountEffect } from '../../hooks'

const ModContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    justify-content: center;
`

const MarginButtonContainer = styled(ButtonContainer)`
    margin-bottom: 1em;
`

const PostsLink = styled.span`
    text-decoration: underline;
    font-size: 1.2em;
    color: #175e88;
    font-weight: 600;
`

function Moderate() {
    const [modQueue, setModQueue] = useState([])
    const { state } = useContext(store)
    const [postCounter, setPostCounter] = useState(0)
    const [error, setError] = useState(false)

    const currentPost = modQueue[postCounter]
    const currentPostDeleted = currentPost && currentPost.deleted === true
    const currentPostKept = currentPost && currentPost.kept === true

    const canGoLeft = postCounter > 0
    const canGoRight = modQueue.length > postCounter + 1

    const { authApiGet, authApiPut, authApiDelete } = useNetworkRequest()

    useMountEffect(() => {
        async function fetchPosts() {
            console.log(`Fetching posts`)
            const response = await authApiGet(endpoints.MODERATE, state.token)
            if (response) {
                const responseObject = await response.json()
                setModQueue(responseObject)
            }
        }
        fetchPosts()
    })

    const replaceQueueAt = (index,newValue) => {
        const newModQueue = [...modQueue]
        newModQueue.splice(index, 1, newValue)
        return newModQueue
    }


    const keepCurrentPost = async () => {
        const postId = currentPost.id
        //make network request to set post as unmoderated
        const response = await authApiPut(
            endpoints.APPROVE + postId,
            {},
            state.token
        )
        if (response) {
            const modPost = Object.assign({ kept: true }, currentPost)
            setModQueue(replaceQueueAt(postCounter,modPost))
            goRight()
        } else {
            setError(true)
            console.log(`Moderation approval failed for post with id ${postId}`)
        }
    }

    const deleteCurrentPost = async () => {
        const postId = currentPost.id
        //make network request to delete post
        const response = await authApiDelete(
            endpoints.POSTS + postId,
            state.token
        )
        if (response) {
            const modPost = Object.assign({ deleted: true }, currentPost)
            setModQueue(replaceQueueAt(postCounter,modPost))
            goRight()
        } else {
            setError(true)
            console.log(`Delete failed for post with id ${postId}`)
        }
    }

    const goLeft = () => {
        let nextPost = postCounter - 1
        if (nextPost < 0) {
            nextPost = 0
        }
        setError(false)
        setPostCounter(nextPost)
    }

    const goRight = () => {
        let nextPost = postCounter + 1
        if (nextPost >= modQueue.length) {
            nextPost = modQueue.length - 1
        }
        setError(false)
        setPostCounter(nextPost)
    }

    return (
        <Fragment>
            <Title>Let's Do the Moderation</Title>
            <FlexRow>
                {modQueue && modQueue.length > 0 ? (
                    <Fragment>
                        <FaChevronLeft
                            size={50}
                            color={canGoLeft ? '#175E88' : 'grey'}
                            onClick={goLeft}
                        />
                        <ModContainer>
                            <ResponsiveBetweenRow>
                                <MarginButtonContainer>
                                    {!currentPostKept && (
                                        <WhiteBlueButton
                                            onClick={keepCurrentPost}
                                        >
                                            Keep
                                        </WhiteBlueButton>
                                    )}
                                    {!currentPostDeleted && (
                                        <WhiteRedButton
                                            onClick={deleteCurrentPost}
                                        >
                                            Delete
                                        </WhiteRedButton>
                                    )}
                                </MarginButtonContainer>
                                <Link to={`/judge/${currentPost.id}`}>
                                    <PostsLink>
                                        {
                                            'Other Reported Posts for this User >>'
                                        }
                                    </PostsLink>
                                </Link>
                            </ResponsiveBetweenRow>
                            {error && (
                                <FormError>Error moderating post</FormError>
                            )}
                            {currentPost && (
                                <GrayableContainer
                                    disabled={
                                        currentPostDeleted || currentPostKept
                                    }
                                >
                                    <PostDetail
                                        postDetails={currentPost}
                                        notSubmitted={true}
                                    />
                                    {currentPost.reports.map((report) => (
                                        <PostReport report={report} />
                                    ))}
                                </GrayableContainer>
                            )}
                        </ModContainer>
                        <FaChevronRight
                            size={50}
                            color={canGoRight ? '#175E88' : 'grey'}
                            onClick={goRight}
                        />
                    </Fragment>
                ) : (
                    <div>Nothing to moderate right now</div>
                )}
            </FlexRow>
        </Fragment>
    )
}

export default Moderate
