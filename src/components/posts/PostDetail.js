import React, { Fragment } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { GreyWhiteButton } from '../shared/Buttons'
import { Title } from '../shared/Text'
import { FloatRight } from '../shared/Layouts'

const PostPrice = styled.div`
    font-weight: normal;
    font-size: 1em;
    margin: 5px 0px;
`

const CopyLink = styled.div`
    font-weight: normal;
    font-size: 0.9em;
    text-decoration: underline;
    color: grey;
    margin: 10px auto;
`
const PostLocation = styled.div`
    font-weight: normal;
    font-size: 0.9em;
    margin: 5px 0px;
`

const PostText = styled.div`
    font-size:0.8em
    margin: 5px 0px;
`

const PostDateTime = styled.div`
    font-size: 0.7em;
    font-weight: bold;
    margin: 5px 0px;
`

const PostImg = styled.img`
    max-height: 400px;
    margin: 5px 0px;
`

function PostDetail({ postDetails }) {
    const post = postDetails
    console.log(postDetails)

    const imgURL = () => {
        return 'http://list.thestoke.ca/photos/' + post.id + '/original.jpg'
    }

    const createMarkup = (sanitizedHTML) => {
        return { __html: sanitizedHTML }
    }

    const replyToPost = () => {
        window.location.href = `mailto:list-${post.id}@thestoke.ca`
    }

    const getPostLocation = (postDetails) => {
        const text = <PostLocation>{postDetails.location}</PostLocation>
        if (
            postDetails.exactLocation &&
            postDetails.exactLocation.coordinates
        ) {
            const href = `https://www.google.com/maps/search/?api=1&query=${postDetails.exactLocation.coordinates[1]},${postDetails.exactLocation.coordinates[0]}`
            return (
                <a rel="noopener noreferrer" target="_blank" href={href}>
                    {text}
                </a>
            )
        } else {
            return text
        }
    }

    return post ? (
        <Fragment>
            <FloatRight>
                <GreyWhiteButton onClick={replyToPost}>
                    Reply to Post
                </GreyWhiteButton>
                <CopyToClipboard text={`list-${post.id}@thestoke.ca`}>
                    <CopyLink>Copy Email Address</CopyLink>
                </CopyToClipboard>
            </FloatRight>
            <Title>{post.title}</Title>
            <PostPrice>{post.price}</PostPrice>
            {getPostLocation(post)}
            {post.photoFileSize !== null ? (
                <PostImg src={imgURL()} alt="Post" />
            ) : null}
            <PostText
                dangerouslySetInnerHTML={createMarkup(post.description)}
            />
            <PostDateTime>{post.created_at}</PostDateTime>
        </Fragment>
    ) : null
}

export default PostDetail
