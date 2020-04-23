import React, { useEffect, useState, Fragment } from 'react'
import Cookies from 'universal-cookie'

import { Title } from '../shared/Text'
import MyPost from '../posts/MyPost'
import { GreyWhiteButton } from '../shared/Buttons'
import { removeCookies } from '../util/cookies'
import { FloatRight} from '../shared/Layouts'
import Login from "../forms/Login"

function MyPosts() {
    const cookies = new Cookies()
    const [isCookieSet, setIsCookieSet] = useState(false)
    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        console.log(cookies)
        if (
            cookies.get('hmac') &&
            cookies.get('challenge') &&
            cookies.get('email')
        ) {
            setIsCookieSet(true)
        }
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        async function fetchPosts() {
            console.log(`Fetching posts for ${cookies.get('email')}`)
            //Include credentials to send cookie for authentication
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/posts/mine`,
                { credentials: 'include' }
            )
            if (response.status === 200) {
                const responseObject = await response.json()
                setMyPosts(responseObject)
            } else {
                //TODO: Handle post loading error
            }
        }
        if (isCookieSet) {
            fetchPosts()
        }
        //eslint-disable-next-line
    }, [isCookieSet])

    const getPostList = () => {
        //TODO: Need to handle no posts for a user, not assume it means posts are still loading
        if (myPosts && myPosts.length && myPosts.length > 0) {
            return myPosts.map((post) => <MyPost post={post} key={post.id} />)
        } else {
            return <div>Posts Loading...</div>
        }
    }

    const logout = () => {
        console.log('Logging out')
        removeCookies()
        setIsCookieSet(false)
    }

    return (
        <Fragment>
            {isCookieSet && (
                <FloatRight>
                    <GreyWhiteButton onClick={logout}>Logout</GreyWhiteButton>
                </FloatRight>
            )}
            <Title>My Posts</Title>
            {isCookieSet ? getPostList() : <Login />}
        </Fragment>
    )
}

export default MyPosts
