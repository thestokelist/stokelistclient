import React, { useEffect, useState, useContext, Fragment } from 'react'
import styled from 'styled-components'

import { Title } from '../shared/Text'
import { endpoints } from '../../constants/endpoints'
import { authApiGet } from '../../util/network'
import { store } from '../store'
import PostDetail from '../posts/PostDetail'
import { WhiteBlueButton, WhiteRedButton } from '../shared/Buttons'
import { FlexBetweenRow } from '../shared/Layouts'

const ModContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    justify-content: center;
`

const ButtonContainer = styled(FlexBetweenRow)`
    width: 250px;
    margin-bottom:1em;
`

function Moderate() {
    const [modQueue, setModQueue] = useState([])
    const { state } = useContext(store)

    useEffect(() => {
        async function fetchPosts() {
            console.log(`Fetching posts`)
            const response = await authApiGet(endpoints.MODERATE, state.token)
            if (response) {
                const responseObject = await response.json()
                setModQueue(responseObject)
            }
        }
        fetchPosts()
    }, [state.token])

    const keepCurrentPost = () => {}
    const deleteCurrentPost = () => {}

    return (
        <Fragment>
            <Title>Let's Do the Moderation</Title>
            <ModContainer>
                <ButtonContainer>
                    <WhiteBlueButton onClick={keepCurrentPost}>Keep</WhiteBlueButton>
                    <WhiteRedButton onClick={deleteCurrentPost}>Delete</WhiteRedButton>
                </ButtonContainer>
                {modQueue.map((post) => (
                    <PostDetail postDetails={post} notSubmitted={true} />
                ))}
            </ModContainer>
        </Fragment>
    )
}

export default Moderate
