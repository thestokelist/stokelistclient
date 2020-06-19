import React, { useState, Fragment, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { Title } from '../shared/Text'
import { useMountEffect } from '../../hooks'
import { endpoints } from '../../constants/endpoints'
import { actionTypes } from '../../constants/actions'
import { store } from '../store'
import { useNetworkRequest } from '../../hooks'

function PostValidate({ match }) {
    const postUUID = match.params.uuid
    const [postDetails, setPostDetails] = useState(null)
    const { dispatch } = useContext(store)
    const { apiPost } = useNetworkRequest()

    useMountEffect(() => {
        async function fetchData() {
            console.log(`Validating post with UUID: ${postUUID}`)
            const response = await apiPost(`${endpoints.VALIDATE}${postUUID}`)
            console.log(response)
            if (response) {
                const responseObject = await response.json()
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    item: {
                        token: responseObject.token,
                        email: responseObject.post.email,
                    },
                })
                setPostDetails(responseObject.post)
            } else {
                setPostDetails(false)
            }
        }
        fetchData()
    })

    const getContent = () => {
        let content
        if (postDetails === null) {
            //Haven't loaded yet
            content = (
                <Fragment>
                    <Title>Validate Post</Title>
                    <div>Validating...</div>
                </Fragment>
            )
        } else if (postDetails === false) {
            content = <Redirect to="/validationfailed" />
        } else {
            content = <Redirect to="/myposts" />
        }
        return content
    }

    return getContent()
}

export default PostValidate
