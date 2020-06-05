import React, { useEffect, useState, useContext } from 'react'

import PostSection from '../posts/PostSection'
import { WhiteBlueButton } from '../shared/Buttons'
import { endpoints } from '../../constants/endpoints'
import { store } from '../store'
import { actionTypes } from '../../constants/actions'
import { useNetworkRequest } from '../../hooks'

function MyPosts() {
    const [myPosts, setMyPosts] = useState([])
    const { state, dispatch } = useContext(store)
    const { authApiGet } = useNetworkRequest()

    useEffect(() => {
        async function fetchPosts() {
            console.log(`Fetching posts`)
            const response = await authApiGet(endpoints.MY_POSTS, state.token)
            if (response) {
                const responseObject = await response.json()
                setMyPosts(responseObject)
            }
        }
        fetchPosts()
    }, [state.token,authApiGet])

    const logout = () => {
        console.log('Logging out')
        dispatch({
            type: actionTypes.LOGOUT,
        })
    }

    const getLogoutButton = () => {
        return <WhiteBlueButton onClick={logout}>Log Out</WhiteBlueButton>
    }

    return (
        <PostSection
            posts={myPosts}
            adminMode={true}
            title={'Your Posts'}
            titleButton={getLogoutButton()}
        />
    )
}

export default MyPosts
