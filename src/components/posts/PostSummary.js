import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import PostLocation from './PostLocation'
import PostPrice from './PostPrice'
import PostSummaryPhoto from './PostSummaryPhoto'
import GrayableContainer from './GrayableContainer'
import { getDateRangeString } from '../../util/datetime'

const PostDetail = styled.div`
    margin-bottom: 10px;
    color: #175e88;
    font-size: 1.2em;
`

const PostDetailsContainer = styled.div`
    flex-grow: 1;
    box-sizing: border-box;
    margin: 10px 20px;
`

const PostTextSummary = styled.div`
    margin-top: 15px;
    font-size: 0.9em;
    color: #000000cc;
`

const PostSummaryContainer = styled.div`
    display: flex;
    margin: 10px 0;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 1px 1px 5px #0000001a;
    border: 1px solid #dce2e8;
    border-radius: 5px;
`

//Generates a full width summary for a post, can be disabled
function PostSummary({ post, disabled, markerNumber }) {
    const isGarageSale = post.isGarageSale === true

    return (
        <GrayableContainer disabled={disabled}>
            <PostSummaryContainer>
                <PostSummaryPhoto post={post} markerNumber={markerNumber} />
                <PostDetailsContainer>
                    <div className="flexed-responsive">
                        <div className="text-slate font-bold text-xl">
                            <div className="no-escape">
                                <Link to={`/post/${post.id}`}>
                                    {post.title}
                                </Link>
                            </div>
                        </div>
                        <div className="no-escape">
                            <PostLocation postDetails={post} />
                        </div>
                    </div>
                    <PostDetail>
                        {isGarageSale ? (
                            getDateRangeString(post.startTime, post.endTime)
                        ) : (
                            <PostPrice price={post.price} />
                        )}
                    </PostDetail>
                    <PostTextSummary>
                        <div className="no-escape">
                            <ReactMarkdown children={post.description} />
                        </div>
                    </PostTextSummary>
                </PostDetailsContainer>
            </PostSummaryContainer>
        </GrayableContainer>
    )
}

export default PostSummary
