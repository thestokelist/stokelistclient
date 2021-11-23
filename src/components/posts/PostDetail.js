import React, { Fragment } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import { FlexBetweenRow, FlexFullHeightColumn } from '../shared/Layouts'
import { Label } from '../shared/Forms'
import { getDateRangeString, getPrettyDateString } from '../../util/datetime'
import PostPrice from './PostPrice'
import PostLocation from './PostLocation'
import PostCopy from './PostCopy'
import PostPhoto from './PostPhoto'

const PostTitle = styled.div`
    color: #434653;
    font-size: 1.6em;
    font-weight: 500;
    margin-bottom: 0.1em;
`

const PostPriceText = styled(PostTitle)`
    color: #175e88;
    margin-bottom: 0.5em;
`

const PostText = styled.div`
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 1px 1px 5px #0000001a;
    border: 1px solid #dce2e8;
    border-radius: 5px;
    color: #000000cb;
    font-size: 0.8em;
    padding: 1em 0.5em;
    width: 70%;
    min-height: 3em;
    box-sizing: border-box;
`

const PostDateTime = styled.div`
    font-size: 0.8em;
    font-style: italic;
    color: #434653;
    margin: 5px 0px;
`

function PostDetail({ postDetails, notSubmitted }) {
    const post = postDetails
    const isGarageSale = post.isGarageSale === true
    const submitted = !notSubmitted

    return post ? (
        <Fragment>
            <FlexBetweenRow>
                <FlexFullHeightColumn>
                    <PostTitle>{post.title}</PostTitle>
                    <PostPriceText>
                        {isGarageSale ? (
                            getDateRangeString(post.startTime, post.endTime)
                        ) : (
                            <PostPrice price={post.price} />
                        )}
                    </PostPriceText>
                </FlexFullHeightColumn>
                {submitted && <PostCopy postDetails={post} />}
            </FlexBetweenRow>

            <PostLocation postDetails={post} />
            <PostPhoto postDetails={post} />
            <Label>Post Description</Label>
            <PostText>
                <ReactMarkdown children={post.description} />
            </PostText>

            {submitted && (
                <PostDateTime>
                    {getPrettyDateString(post.created_at)}
                </PostDateTime>
            )}
        </Fragment>
    ) : null
}

export default PostDetail
