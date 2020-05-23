import React, { useEffect, useState, useContext, useMemo } from 'react'

import PostSection from '../posts/PostSection'
import { WhiteBlueButton } from '../shared/Buttons'
import Login from '../forms/Login'
import { endpoints } from '../../constants/endpoints'
import { authApiGet } from '../../util/network'
import { store } from '../store'
import { actionTypes } from '../../constants/actions'

function MyPosts() {
    const [myPosts, setMyPosts] = useState([])
    const { state, dispatch } = useContext(store)

    const loggedIn = useMemo(() => {
        return state.loggedIn === true
    }, [state])

    useEffect(() => {
        async function fetchPosts() {
            console.log(`Fetching posts`)
            const response = await authApiGet(endpoints.MY_POSTS, state.token)
            if (response) {
                const responseObject = await response.json()
                setMyPosts(responseObject)
            }
        }
        if (loggedIn) {
            fetchPosts()
        }
    }, [state.token, loggedIn])

    const logout = () => {
        console.log('Logging out')
        dispatch({
            type: actionTypes.LOGOUT,
        })
    }

    const getLogoutButton = () => {
        return <WhiteBlueButton onClick={logout}>Log Out</WhiteBlueButton>
    }

    return loggedIn ? (
        <PostSection
            posts={myPosts}
            adminMode={true}
            title={'Your Posts'}
            titleButton={getLogoutButton()}
        />
    ) : (
        <Login />
    )
}

export default MyPosts
