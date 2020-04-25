import React, { useEffect, useState, Fragment, useMemo } from 'react'
import Cookies from 'universal-cookie'

import { Title } from '../shared/Text'
import MyPostList from '../posts/MyPostList'
import { GreyWhiteButton } from '../shared/Buttons'
import { removeCookies } from '../../util/cookies'
import { FloatRight } from '../shared/Layouts'
import Login from '../forms/Login'
import { endpoints } from '../../constants/endpoints' 
import { authApiGet } from '../../util/network'

function MyPosts() {
    const cookies = new Cookies()
    const [isCookieSet, setIsCookieSet] = useState(false)
    const [myPosts, setMyPosts] = useState(null)

    const cookiesExist = useMemo(
        () =>
            cookies.get('hmac') &&
            cookies.get('challenge') &&
            cookies.get('email'),
        [cookies]
    )

    const cookieEmail = useMemo(() => cookies.get('email'), [cookies])

    useEffect(() => {
        if (cookiesExist) {
            setIsCookieSet(true)
        }
    }, [cookiesExist])

    useEffect(() => {
        async function fetchPosts() {
            console.log(`Fetching posts for ${cookieEmail}`)
            //Include credentials to send cookie for authentication
            const response = await authApiGet(endpoints.MY_POSTS)
            if (response) {
                const responseObject = await response.json()
                setMyPosts(responseObject)
            }
        }
        if (isCookieSet) {
            fetchPosts()
        }
    }, [isCookieSet, cookieEmail])

    const logout = () => {
        console.log('Logging out')
        removeCookies()
        setIsCookieSet(false)
    }

    const getLogoutButton = () => {
        return (
            <FloatRight>
                <GreyWhiteButton onClick={logout}>Logout</GreyWhiteButton>
            </FloatRight>
        )
    }

    return (
        <Fragment>
            {isCookieSet && getLogoutButton()}
            <Title>My Posts</Title>
            {isCookieSet ? <MyPostList posts={myPosts} /> : <Login />}
        </Fragment>
    )
}

export default MyPosts
