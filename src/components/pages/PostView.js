import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Loading from '../shared/Loading'
import PostDetail from '../posts/PostDetail'
import { endpoints } from '../../constants/endpoints'
import { useNetworkRequest, useMountEffect } from '../../hooks'
import Ad from '../adverts/Ad'

import {
    EmailShareButton,
    EmailIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    RedditShareButton,
    RedditIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'react-share'

function PostView({ match }) {
    const postID = match.params.id
    const [postDetails, setPostDetails] = useState(null)
    const history = useHistory()
    const { apiGet } = useNetworkRequest()

    useMountEffect(() => {
        async function loadPost() {
            console.log('Loading post details')
            try {
                const res = await apiGet(`${endpoints.POSTS}${postID}`)
                const post = await res.json()
                setPostDetails(post)
            } catch (e) {
                setPostDetails(false)
            }
        }
        loadPost()
    })

    const doReport = () => {
        history.push(`/report/${postID}`)
    }

    return (
        <div>
            {postDetails === null ? (
                <Loading />
            ) : postDetails === false ? (
                <div className="text-xl form-label">
                    Sorry, we couldn't find this post. It could have been
                    deleted by the user who posted it.
                </div>
            ) : (
                <PostDetail postDetails={postDetails} />
            )}
            <div className="form-label mb-1">Share This Post</div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flexed-row my-2 lg:my-0">
                    <div className="mr-1">
                        <EmailShareButton url={window.location.href}>
                            <EmailIcon size={30} round={true} />
                        </EmailShareButton>
                    </div>
                    <div className="mr-1">
                        <RedditShareButton url={window.location.href}>
                            <RedditIcon size={30} round={true} />
                        </RedditShareButton>
                    </div>
                    <div className="mr-1">
                        <TwitterShareButton url={window.location.href}>
                            <TwitterIcon size={30} round={true} />
                        </TwitterShareButton>
                    </div>
                    <div className="mr-1">
                        <WhatsappShareButton url={window.location.href}>
                            <WhatsappIcon size={30} round={true} />
                        </WhatsappShareButton>
                    </div>
                    <FacebookMessengerShareButton url={window.location.href}>
                        <FacebookMessengerIcon size={30} round={true} />
                    </FacebookMessengerShareButton>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center">
                    <div className="text-blue italic mr-4 my-2 lg:my-1">
                        Does this post break{' '}
                        <Link className="block lg:inline" to="/commandments">
                            <u>The Stoke List Commandments?</u>
                        </Link>
                    </div>
                    <button
                        className="w-max text-blue bg-white border border-solid border-blue shadow-lg rounded-lg px-6 py-1 text-md font-bold text-center my-2 lg:my-0"
                        onClick={doReport}
                    >
                        Report Post
                    </button>
                </div>
            </div>
            <div className="my-4">
                <Ad />
            </div>
        </div>
    )
}

export default PostView
