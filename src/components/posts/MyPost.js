import React, { useState, Fragment } from 'react'

import {
    SmallGreyWhiteButton,
    GreyWhiteButton,
    WhiteWhiteButton,
} from '../shared/Buttons'
import { AlignRight } from '../shared/Layouts'
import PostSummary from './PostSummary'
import ReactModal from 'react-modal'
import { useModal } from 'react-modal-hook'
import { Title } from '../shared/Text'
import { authApiDelete } from '../../util/network'
import { endpoints } from '../../constants/endpoints'

function MyPost({ post }) {
    const deletePost = async () => {
        const response = await authApiDelete(`${endpoints.POSTS}/${post.id}`)
        if (response) {
            setDeleted(true)
        } else {
            console.log(`Delete failed for post with id ${post.id}`)
        }
        hideModal()
    }

    const [deleted, setDeleted] = useState(false)
    const [showModal, hideModal] = useModal(() => (
        <ReactModal isOpen onRequestClose={hideModal}>
            <Title>Delete Post</Title>
            Are you sure you want to delete this post?
            <PostSummary post={post} />
            <AlignRight>
                <WhiteWhiteButton onClick={hideModal}>Cancel</WhiteWhiteButton>
                <GreyWhiteButton onClick={deletePost}>
                    Yes, Delete Post
                </GreyWhiteButton>
            </AlignRight>
        </ReactModal>
    ), [post])

    return (
        <Fragment>
            {deleted ? (
                <Fragment>
                    <PostSummary post={post} disabled={true} />
                    <AlignRight>
                        <div>This post has been deleted</div>
                    </AlignRight>
                </Fragment>
            ) : (
                <Fragment>
                    <PostSummary post={post} />
                    <AlignRight>
                        <SmallGreyWhiteButton onClick={showModal}>
                            Delete
                        </SmallGreyWhiteButton>
                    </AlignRight>
                </Fragment>
            )}
        </Fragment>
    )
}

export default MyPost
