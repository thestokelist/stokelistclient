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
            const res = await apiGet(`${endpoints.POSTS}${postID}`)
            if (res) {
                const post = await res.json()
                setPostDetails(post)
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
            ) : (
                <PostDetail postDetails={postDetails} />
            )}
            <div className="form-label">Share This Post</div>
            <div className="flexed-responsive">
                <div className="flexed-row">
                    <EmailShareButton url={window.location.href}>
                        <EmailIcon size={30} round={true} />
                    </EmailShareButton>
                    <RedditShareButton url={window.location.href}>
                        <RedditIcon size={30} round={true} />
                    </RedditShareButton>
                    <TwitterShareButton url={window.location.href}>
                        <TwitterIcon size={30} round={true} />
                    </TwitterShareButton>
                    <WhatsappShareButton url={window.location.href}>
                        <WhatsappIcon size={30} round={true} />
                    </WhatsappShareButton>
                    <FacebookMessengerShareButton url={window.location.href}>
                        <FacebookMessengerIcon size={30} round={true} />
                    </FacebookMessengerShareButton>
                </div>
                <div className="flexed-row">
                    <div className="text-blue italic mr-4">
                        Does this post break{' '}
                        <Link to="/commandments">
                            <u>The Stoke List Commandments?</u>
                        </Link>
                    </div>
                    <button className="text-blue bg-white border border-solid border-blue shadow-lg rounded-lg px-6 py-1 text-md font-bold text-center" onClick={doReport}>
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
