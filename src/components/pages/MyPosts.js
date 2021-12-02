import React, { useState, useContext, Fragment } from 'react'

import PostSection from '../posts/PostSection'
import { WhiteBlueButton } from '../shared/Buttons'
import { endpoints } from '../../constants/endpoints'
import { store } from '../store'
import { actionTypes } from '../../constants/actions'
import { useNetworkRequest, useMountEffect } from '../../hooks'
import Loading from '../shared/Loading'

function MyPosts({ location }) {
    const [loading, setLoading] = useState(true)
    const [myPosts, setMyPosts] = useState([])
    const { state, dispatch } = useContext(store)
    const { authApiGet, authApiDelete } = useNetworkRequest()
    const fromValidation = !!(
        location.state && location.state.validated === true
    )

    useMountEffect(() => {
        async function fetchPosts() {
            console.log(`Fetching posts`)
            const response = await authApiGet(endpoints.MY_POSTS, state.token)
            if (response) {
                const responseObject = await response.json()
                setMyPosts(responseObject)
            }
            setLoading(false)
        }
        fetchPosts()
    })

    const logout = () => {
        console.log('Logging out')
        dispatch({
            type: actionTypes.LOGOUT,
        })
    }

    const logoutEverywhere = async () => {
        console.log('Logging out everywhere')
        const response = await authApiDelete(endpoints.LOGIN, state.token)
        if (response) {
            console.log('Logged out everywhere')
            dispatch({
                type: actionTypes.LOGOUT,
            })
        }
    }

    return loading ? (
        <Loading />
    ) : (
        <Fragment>
            {fromValidation && (
                <div className="flash">Your email address has been confirmed!</div>
            )}
            <PostSection
                posts={myPosts}
                adminMode={true}
                emptyText={`No Posts Found. First time users require moderation approval, and won't appear here until approved`}
                title={'Your Posts'}
                titleButton={
                    <div>
                        <WhiteBlueButton onClick={logout}>
                            Log Out
                        </WhiteBlueButton>
                        <div className="text-blue text-xs underline" onClick={logoutEverywhere}>
                            Log Out on All Devices
                        </div>
                    </div>
                }
            />
        </Fragment>
    )
}

export default MyPosts
