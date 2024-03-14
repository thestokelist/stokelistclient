import React, { useState, useContext, Fragment } from 'react'

import PostSection from '../posts/PostSection'

import { endpoints } from '../../constants/endpoints'
import { store } from '../store'
import { actionTypes } from '../../constants/actions'
import { useNetworkRequest, useMountEffect } from '../../hooks'
import Loading from '../shared/Loading'

function MyPosts() {
    const [loading, setLoading] = useState(true)
    const [myPosts, setMyPosts] = useState([])
    const { state, dispatch } = useContext(store)
    const { authApiGet, authApiDelete } = useNetworkRequest()

    useMountEffect(() => {
        async function fetchPosts() {
            console.log(`Fetching posts`)
            const {success, response} = await authApiGet(endpoints.MY_POSTS, state.token)
            if (success) {
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
        const {success} = await authApiDelete(endpoints.LOGIN, state.token)
        if (success) {
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
            <PostSection
                posts={myPosts}
                adminMode={true}
                emptyText={`No Posts Found. First time users require moderation approval, and won't appear here until approved`}
                title={'Your Posts'}
                titleButton={
                    <div className="text-center">
                        <button className="btn-white" onClick={logout}>
                            Log Out
                        </button>
                        <div className="text-blue text-s underline mt-4" onClick={logoutEverywhere}>
                            Log Out on All Devices
                        </div>
                    </div>
                }
            />
        </Fragment>
    )
}

export default MyPosts
