import React, { useState, useContext, Fragment } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { endpoints } from '../../constants/endpoints'
import { store } from '../store'
import PostDetail from '../posts/PostDetail'
import PostReport from '../posts/PostReport'
import GrayableContainer from '../posts/GrayableContainer'
import { useNetworkRequest, useMountEffect } from '../../hooks'

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
            const {success, response} = await authApiGet(endpoints.MODERATE, state.token)
            if (success) {
                const responseObject = await response.json()
                setModQueue(responseObject)
            }
        }
        fetchPosts()
    })

    const replaceQueueAt = (index, newValue) => {
        const newModQueue = [...modQueue]
        newModQueue.splice(index, 1, newValue)
        return newModQueue
    }

    const keepCurrentPost = async () => {
        const postId = currentPost.id
        //make network request to set post as unmoderated
        const {success} = await authApiPut(
            endpoints.APPROVE + postId,
            {},
            state.token
        )
        if (success) {
            const modPost = Object.assign({ kept: true, deleted: false }, currentPost)
            setModQueue(replaceQueueAt(postCounter, modPost))
            goRight()
        } else {
            setError(true)
            console.log(`Moderation approval failed for post with id ${postId}`)
        }
    }

    const deleteCurrentPost = async () => {
        const postId = currentPost.id
        //make network request to delete post
        const {success}  = await authApiDelete(
            endpoints.POSTS + postId,
            state.token
        )
        if (success) {
            const modPost = Object.assign({ deleted: true, kept: false }, currentPost)
            setModQueue(replaceQueueAt(postCounter, modPost))
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
            <div className="title">Let's Do the Moderation</div>
            <div className="flexed-row justify-between">
                <div onClick={goLeft}>
                    <FaChevronLeft
                        size={50}
                        color={canGoLeft ? '#175E88' : 'grey'}
                        className="min-w-max z-50"
                    />
                    <span className="text-slate text-lg font-bold">Back</span>
                </div>

                <div onClick={goRight}>
                    <span className="text-slate text-lg font-bold">Next</span>
                    <FaChevronRight
                        size={50}
                        color={canGoRight ? '#175E88' : 'grey'}
                        className="min-w-max z-50"
                    />
                </div>
            </div>
            <div className="flexed-row">
                {modQueue && modQueue.length > 0 ? (
                    <Fragment>
                        <div className="w-full lg:w-4/5 mx-0 my-auto justify-center">
                            {currentPost.reports.map((report) => (
                                <PostReport key={report} report={report} />
                            ))}
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                                <div className="flexed-row lg:justify-between mb-1 w-1/3">
                                    {!currentPostKept && (
                                        <button
                                            className="btn-white"
                                            onClick={keepCurrentPost}
                                        >
                                            {currentPostDeleted
                                                ? 'Actually, Keep'
                                                : 'Keep'}
                                        </button>
                                    )}
                                    {!currentPostDeleted && (
                                        <button
                                            className="btn-white-red"
                                            onClick={deleteCurrentPost}
                                        >
                                            {currentPostKept
                                                ? 'Actually, Delete'
                                                : 'Delete'}
                                        </button>
                                    )}
                                </div>
                            </div>
                            {error && (
                                <div className="form-error">
                                    Error moderating post
                                </div>
                            )}
                            {currentPost && (
                                <GrayableContainer
                                    disabled={
                                        currentPostDeleted
                                    }
                                >
                                    <div className="bg-blue h-1 my-2" />
                                    <PostDetail
                                        postDetails={currentPost}
                                        notSubmitted={true}
                                    />
                                </GrayableContainer>
                            )}
                            <div className="mt-2">
                                <Link to={`/judge/${currentPost.id}`}>
                                    <span className="underline text-lg text-blue font-semibold">
                                        {'See All Other Posts by this User >>'}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <div>Nothing to moderate right now</div>
                )}
            </div>
        </Fragment>
    )
}

export default Moderate
