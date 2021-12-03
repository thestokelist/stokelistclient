import React, { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'

import { getDateRangeString, getPrettyDateString } from '../../util/datetime'
import PostPrice from './PostPrice'
import PostLocation from './PostLocation'
import PostCopy from './PostCopy'
import PostPhoto from './PostPhoto'

function PostDetail({ postDetails, notSubmitted }) {
    const post = postDetails
    const isGarageSale = post.isGarageSale === true
    const submitted = !notSubmitted

    return post ? (
        <Fragment>
            <div className="flexed-row justify-between">
                <div className="flexed-column">
                    <div className="mb-1 font-medium text-2xl text-slate">
                        {post.title}
                    </div>
                    <div className="text-blue mb-2 font-medium text-2xl">
                        {isGarageSale ? (
                            getDateRangeString(post.startTime, post.endTime)
                        ) : (
                            <PostPrice price={post.price} />
                        )}
                    </div>
                </div>
                {submitted && <PostCopy postDetails={post} />}
            </div>

            <PostLocation postDetails={post} />
            <PostPhoto postDetails={post} />
            <div className="form-label">Post Description</div>
            <div className="bg-white shadow gray-border rounded text-slate text-sm px-4 py-2 w-3/4 min-h-16 box-border">
                <ReactMarkdown children={post.description} />
            </div>

            {submitted && (
                <div className="italic text-slate mx-2 text-sm">
                    {getPrettyDateString(post.created_at)}
                </div>
            )}
        </Fragment>
    ) : null
}

export default PostDetail
