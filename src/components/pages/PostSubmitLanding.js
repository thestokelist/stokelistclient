import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'

import PostSubmitLandingLoggedIn from './static/PostSubmitLandingLoggedIn'
import PostSubmitLandingLoggedOut from './static/PostSubmitLandingLoggedOut'
import { store } from '../store'
import { useTimeout } from '../../hooks'

function PostSubmitLanding() {
    const [timeout, setTimeout] = useState(false)
    const { state } = useContext(store)

    useTimeout(() => {
        setTimeout(true)
    }, 10000)
    return state.loggedIn ? (
        timeout ? (
            <Redirect to="/" />
        ) : (
            <PostSubmitLandingLoggedIn />
        )
    ) : (
        <PostSubmitLandingLoggedOut />
    )
}

export default PostSubmitLanding
