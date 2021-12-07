import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import PostLocation from './PostLocation'
import PostPrice from './PostPrice'
import PostSummaryPhoto from './PostSummaryPhoto'
import GrayableContainer from './GrayableContainer'
import { getDateRangeString } from '../../util/datetime'

//Generates a full width summary for a post, can be disabled
function PostSummary({ post, disabled, markerNumber }) {
    const isGarageSale = post.isGarageSale === true

    return (
        <GrayableContainer disabled={disabled}>
            <div className="flex p-1 mb-4 bg-white shadow gray-border rounded">
                <PostSummaryPhoto post={post} markerNumber={markerNumber} />
                <div className="flex-grow box-border px-4 py-2">
                    <div className="flexed-responsive">
                        <div className="text-slate font-medium text-2xl">
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
                    <div className="mb-2 text-blue text-xl">
                        {isGarageSale ? (
                            getDateRangeString(post.startTime, post.endTime)
                        ) : (
                            <PostPrice price={post.price} />
                        )}
                    </div>
                    <div className="text-slate text-sm">
                        <div className="no-escape">
                            <ReactMarkdown className="markdown" children={post.description} />
                        </div>
                    </div>
                </div>
            </div>
        </GrayableContainer>
    )
}

export default PostSummary
