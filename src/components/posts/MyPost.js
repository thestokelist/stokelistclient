import React, { useState } from 'react'

import { SmallGreyWhiteButton, GreyWhiteButton, WhiteWhiteButton } from '../shared/Buttons'
import { AlignRight } from '../shared/Layouts'
import PostSummary from './PostSummary'
import Modal from 'simple-react-modal'
import { Title } from '../shared/Text'

function MyPost({ post }) {
    const deletePost = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/posts/${post.id}`,
            { method: 'DELETE', credentials: 'include' }
        )
        if (response.status === 204) {
            setDeleted(true)
        } else {
            console.log(`Delete failed for post with id ${post.id}`)
        }
        hideModal()
    }

    const [deleted, setDeleted] = useState(false)
    const [modal, setModal] = useState(false)

    const showModal = () => {
        setModal(true)
    }

    const hideModal = () => {
        setModal(false)
    }

    return (
        <div>
            {deleted ? (
                <div>
                    <PostSummary post={post} disabled={true} />
                    <AlignRight>
                        <div>This post has been deleted</div>
                    </AlignRight>
                </div>
            ) : (
                <div>
                    <PostSummary post={post} />
                    <AlignRight>
                        <SmallGreyWhiteButton onClick={showModal}>
                            Delete
                        </SmallGreyWhiteButton>
                    </AlignRight>
                </div>
            )}
            <Modal closeOnOuterClick={true} show={modal} onClose={hideModal}>
                <div>
                    <Title>Delete Post</Title>
                    Are you sure you want to delete this post?
                    <PostSummary post={post} />
                    <AlignRight>
                        <WhiteWhiteButton onClick={hideModal}>Cancel</WhiteWhiteButton>
                        <GreyWhiteButton onClick={deletePost}>Yes, Delete Post</GreyWhiteButton>
                    </AlignRight>
                </div>
            </Modal>
        </div>
    )
}

export default MyPost
