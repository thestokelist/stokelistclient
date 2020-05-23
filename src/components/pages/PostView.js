import React, { useEffect, useState } from 'react'

import { Label } from '../shared/Forms'
import PostDetail from '../posts/PostDetail'
import PostSearch from '../posts/PostSearch'
import { endpoints } from '../../constants/endpoints'
import { apiGet } from '../../util/network'
import {
    FlexBetweenRow,
    FlexFullHeightColumn,
    FlexRow,
} from '../shared/Layouts'

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

    useEffect(() => {
        async function loadPost() {
            console.log('Loading post details')
            const res = await apiGet(`${endpoints.POSTS}${postID}`)
            if (res) {
                const post = await res.json()
                setPostDetails(post)
            }
        }
        loadPost()
    }, [postID])

    return (
        <PostSearch>
            {postDetails === null ? (
                <div>Loading...</div>
            ) : (
                <PostDetail postDetails={postDetails} />
            )}
            <FlexBetweenRow>
                <FlexFullHeightColumn>
                    <Label>Share This Post</Label>
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
                </FlexFullHeightColumn>
            </FlexBetweenRow>
        </PostSearch>
    )
}

export default PostView
