import React, { useState, useContext } from 'react'

import PostSection from '../posts/PostSection'
import { WhiteBlueButton } from '../shared/Buttons'
import { endpoints } from '../../constants/endpoints'
import { store } from '../store'
import { actionTypes } from '../../constants/actions'
import { useNetworkRequest, useMountEffect } from '../../hooks'
import { FaSpinner } from 'react-icons/fa'

function MyPosts() {
    const [loading, setLoading] = useState(true)
    const [myPosts, setMyPosts] = useState([])
    const { state, dispatch } = useContext(store)
    const { authApiGet } = useNetworkRequest()

    useMountEffect(() => {
        async function fetchPosts() {
            console.log(`Fetching posts`)
            const response = await authApiGet(endpoints.MY_POSTS, state.token)
            if (response) {
                const responseObject = await response.json()
                setMyPosts(responseObject)
                setLoading(false)
            }
        }
        fetchPosts()
    })

    const logout = () => {
        console.log('Logging out')
        dispatch({
            type: actionTypes.LOGOUT,
        })
    }

    const getLogoutButton = () => {
        return <WhiteBlueButton onClick={logout}>Log Out</WhiteBlueButton>
    }

    return loading ? (
        <FaSpinner size={40} className="fa-spin" />
    ) : (
        <PostSection
            posts={myPosts}
            adminMode={true}
            title={'Your Posts'}
            titleButton={getLogoutButton()}
        />
    )
}

export default MyPosts
