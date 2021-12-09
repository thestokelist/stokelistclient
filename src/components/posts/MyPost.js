import React, { useState, Fragment, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import PostSummary from './PostSummary'
import { store } from '../store'
import { endpoints } from '../../constants/endpoints'
import { useNetworkRequest } from '../../hooks'

function MyPost({ post }) {
    const { state } = useContext(store)
    const [deleted, setDeleted] = useState(false)
    const history = useHistory()
    const { authApiDelete, authApiPatch } = useNetworkRequest()

    const deletePost = async () => {
        const response = await authApiDelete(
            `${endpoints.POSTS}${post.id}`,
            state.token
        )
        if (response) {
            setDeleted(true)
        } else {
            console.log(`Delete failed for post with id ${post.id}`)
        }
    }

    const undeletePost = async () => {
        const response = await authApiPatch(
            `${endpoints.POSTS}${post.id}`,
            state.token
        )
        if (response) {
            setDeleted(false)
        } else {
            console.log(`Undelete failed for post with id ${post.id}`)
        }
    }

    const editPost = async () => {
        history.push(`/edit/${post.id}`)
    }

    return (
        <Fragment>
            <PostSummary post={post} disabled={deleted} />
            <div className="flex w-full justify-end">
                {deleted ? (
                    <div className="mt-0 mb-6">
                        <button
                            className="btn-white"
                            onClick={undeletePost}
                        >
                            Undo Delete
                        </button>
                    </div>
                ) : (
                    <div className="flexed-row justify-between w-72 mt-0 mb-6">
                        <button className="btn-white" onClick={editPost}>
                            Edit
                        </button>
                        <button className="btn-white-red" onClick={deletePost}>
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default MyPost
