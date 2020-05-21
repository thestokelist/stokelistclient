import React, {
    useEffect,
    useState,
    Fragment,
    useContext,
    useMemo,
} from 'react'

import { Title } from '../shared/Text'
import MyPostList from '../posts/MyPostList'
import { GreyWhiteButton } from '../shared/Buttons'
import Login from '../forms/Login'
import { endpoints } from '../../constants/endpoints'
import { authApiGet } from '../../util/network'
import { store } from '../store'
import { actionTypes } from '../../constants/actions'

function MyPosts() {
    const [myPosts, setMyPosts] = useState(null)
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
        return <GreyWhiteButton onClick={logout}>Logout</GreyWhiteButton>
    }

    return (
        <Fragment>
            {loggedIn && getLogoutButton()}
            <Title>My Posts</Title>
            {loggedIn ? <MyPostList posts={myPosts} /> : <Login />}
        </Fragment>
    )
}

export default MyPosts
