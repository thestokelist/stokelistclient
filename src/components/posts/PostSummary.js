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
            <div className="flex my-2 bg-white shadow gray-border rounded">
                <PostSummaryPhoto post={post} markerNumber={markerNumber} />
                <div className="flex-grow box-border mx-4 my-8">
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
                    <div className="mb-4 text-blue text-lg">
                        {isGarageSale ? (
                            getDateRangeString(post.startTime, post.endTime)
                        ) : (
                            <PostPrice price={post.price} />
                        )}
                    </div>
                    <div className="mt-6 text-slate">
                        <div className="no-escape">
                            <ReactMarkdown children={post.description} />
                        </div>
                    </div>
                </div>
            </div>
        </GrayableContainer>
    )
}

export default PostSummary
