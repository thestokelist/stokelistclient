import React, {useEffect, useState} from 'react'
//eslint-disable-next-line
import styled from 'styled-components'
import Cookies from "universal-cookie"

import { Title } from "../shared/Text" 
import PostSummary from "./PostSummary"

function MyPosts() {

    const cookies = new Cookies();
    const [isCookieSet, setIsCookieSet] = useState(false)
    const [myPosts, setMyPosts] =  useState([])
    

    useEffect(() => {
        console.log(cookies)
       if (cookies.get('hmac') && cookies.get('challenge') && cookies.get('email')) {
           setIsCookieSet(true)
       }
       //eslint-disable-next-line
    }, [])

    useEffect(() => {
        async function fetchPosts() {
            console.log(`Fetching posts for ${cookies.get('email')}`)
            //Include credentials to send cookie for authentication
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/mine`, {credentials: 'include'})
            const responseObject = await response.json();
            setMyPosts(responseObject)
        }
       if (isCookieSet) {
           fetchPosts()
       }
       //eslint-disable-next-line
    }, [isCookieSet])

    const getPostList = () => {
        if (myPosts && myPosts.length && myPosts.length > 0) {
            console.log(myPosts)
            return myPosts.map(post => <PostSummary post={post} key={post.id}/>)
        } else {
            return <div>Posts Loading...</div>
        }
    }

    return (<div>
                <Title>My Posts</Title>
                {isCookieSet ? 
                    getPostList()
                :
                    <div>Not logged in </div>
                 }
            </div>)
}

export default MyPosts