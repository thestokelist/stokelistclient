import React, { Fragment } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { GreyWhiteButton } from '../shared/Buttons'
import PostLocation from './PostLocation'
import { Title } from '../shared/Text'
import { FloatRight } from '../shared/Layouts'
import { getDateRangeString } from '../../util/datetime'

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
    const isGarageSale = (post.isGarageSale === true)
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
            <PostPrice>
                {isGarageSale
                    ? getDateRangeString(post.startTime, post.endTime)
                    : post.price}
            </PostPrice>
            <PostLocation postDetails={post} />
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
