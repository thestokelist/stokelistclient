import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'

import { Label } from '../shared/Forms'
import { WhiteBlueButton } from '../shared/Buttons'
import Loading from '../shared/Loading'
import PostDetail from '../posts/PostDetail'
import PostSearch from '../posts/PostSearch'
import { endpoints } from '../../constants/endpoints'
import { ResponsiveBetweenRow, FlexRow } from '../shared/Layouts'
import { useNetworkRequest, useMountEffect } from '../../hooks'

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

const ReportText = styled.div`
    font-weight: 400;
    font-size: 0.9em;
    color: #175e88;
    font-style: italic;
    margin-right: 1em;
`

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
        <PostSearch>
            {postDetails === null ? (
                <Loading />
            ) : (
                <PostDetail postDetails={postDetails} />
            )}
            <Label>Share This Post</Label>
            <ResponsiveBetweenRow>
                <FlexRow>
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
                </FlexRow>
                <FlexRow>
                    <ReportText>
                        Does this post break{' '}
                        <Link to="/commandments">
                            <u>The Stoke List Commandments?</u>
                        </Link>
                    </ReportText>
                    <WhiteBlueButton onClick={doReport}>
                        Report Post
                    </WhiteBlueButton>
                </FlexRow>
            </ResponsiveBetweenRow>
        </PostSearch>
    )
}

export default PostView
