import React, { useState, Fragment, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { WhiteBlueButton, WhiteRedButton } from '../shared/Buttons'
import { AlignRight } from '../shared/Layouts'
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
            <AlignRight>
                {deleted ? (
                    <WhiteBlueButton onClick={undeletePost}>
                        Undelete
                    </WhiteBlueButton>
                ) : (
                    <div className="flexed-row justify-between w-16">
                        <WhiteBlueButton onClick={editPost}>
                            Edit
                        </WhiteBlueButton>
                        <WhiteRedButton onClick={deletePost}>
                            Delete
                        </WhiteRedButton>
                    </div>
                )}
            </AlignRight>
        </Fragment>
    )
}

export default MyPost
