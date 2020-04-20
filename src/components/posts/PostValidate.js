//eslint-disable-next-line
import React, {useEffect, useState} from 'react'
//eslint-disable-next-line
import styled from 'styled-components'
import Cookies from "universal-cookie"

import { Title } from "../shared/Text" 
import { Flash } from "../shared/Layouts"
import PostDetail from "./PostDetail"


function PostValidate({ match }) {

    const postUUID = match.params.uuid;
    const [postDetails, setPostDetails] = useState(null)
    const cookies = new Cookies();

    useEffect(() => {
        const cookieOptions = { path : '/', secure: true, sameSite: 'Strict'}
        async function fetchData() {
            console.log(`Validating post with UUID: ${postUUID}`)
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/v/${postUUID}`, {method: 'POST'})
            const responseObject = await response.json();
            setPostDetails(responseObject.post) 
            cookies.set('challenge', postUUID, cookieOptions)
            cookies.set('hmac', responseObject.hmac, cookieOptions)
            cookies.set('email', responseObject.post.email, cookieOptions)
        }
        fetchData()
    //remove any dependencies to force a single load
    //eslint-disable-next-line
    }, [])
    return (<div>
        {postDetails === null ? 
            <div>
                <Title>Validate Post</Title>
                <div>Validating...</div>
            </div>
        :
            <div>
                <Flash>Your email has been verified, you'll see your post on the Stoke List soon</Flash>
                <PostDetail postDetails={postDetails} />
            </div>
        }
    </div>)
}

export default PostValidate