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
            <div className="flex flex-col lg:flex-row p-1 mb-4 bg-white shadow gray-border rounded">
                <Link to={`/post/${post.id}`}>
                    <PostSummaryPhoto post={post} markerNumber={markerNumber} />
                </Link>

                <div className="hidden lg:block flex-grow box-border px-4 py-2">
                    <div className="flex flex-row items-center justify-between">
                        <div className="text-slate font-semibold text-xl">
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
                            <ReactMarkdown
                                className="markdown"
                                children={post.description}
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:hidden flex-grow box-border px-4 py-2">
                    <div className="text-slate font-semibold text-xl">
                        <div className="no-escape">
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </div>
                    </div>
                    <div className="text-slate text-sm">
                        <div className="no-escape">
                            <ReactMarkdown
                                className="markdown"
                                children={post.description}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="mb-2 text-blue text-xl">
                            {isGarageSale ? (
                                getDateRangeString(post.startTime, post.endTime)
                            ) : (
                                <PostPrice price={post.price} />
                            )}
                        </div>
                        <div className="no-escape">
                            <PostLocation postDetails={post} />
                        </div>
                    </div>
                </div>
            </div>
        </GrayableContainer>
    )
}

export default PostSummary
