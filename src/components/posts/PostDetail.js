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
            <div className="flex-col flex lg:flex-row lg:items-center justify-between">
                <div className="flex h-full flex-col mb-2">
                    <div className="mb-1 font-medium text-3xl lg:text-4xl text-slate">
                        {post.title}
                    </div>
                    <div className="text-blue font-medium text-2xl lg:text-3xl">
                        {isGarageSale ? (
                            getDateRangeString(post.startTime, post.endTime)
                        ) : (
                            <PostPrice price={post.price} />
                        )}
                    </div>
                    <div className="lg:hidden text-xl">
                        <PostLocation postDetails={post} />
                    </div>
                </div>
                {submitted && <PostCopy postDetails={post} />}
            </div>
            <div className="hidden text-xl lg:block">
                <PostLocation postDetails={post} />
            </div>

            <PostPhoto postDetails={post} />
            <div className="bg-white shadow gray-border rounded text-slate text-base px-4 py-2 w-full lg:w-3/4 h-32 box-border mt-8">
                <ReactMarkdown
                    className="markdown"
                    children={post.description}
                />
            </div>

            {submitted && (
                <div className="italic text-slate mt-2 mb-6 lg:mb-2 text-base lg:text-sm">
                    {getPrettyDateString(post.created_at)}
                </div>
            )}
        </Fragment>
    ) : null
}

export default PostDetail
