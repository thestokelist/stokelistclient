import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { store } from '../store'
import { BlueButton } from '../shared/Buttons'
import { FlexRow } from '../shared/Layouts'

const HeaderContainer = styled.div`
    padding: 0% 6%;
    width: 100%;
    display: flex;
    flex-direction: row;
    min-height: 100px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0 8px 5px -5px #00000026;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    box-sizing: border-box;
    /* Small Devices, Tablets */
    @media only screen and (max-width: 768px) {
        flex-direction: column;
        min-height: auto;
        padding-bottom: 1em;
    }
`

const HeaderLinkText = styled.div`
    color: #175e88;
    font-size: 1.3em;
    margin: 0em 1em;
    font-weight: 500;
`

const HeaderLinks = styled.div`
    display: flex;
    align-items: center;
    color: #595959;
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`

const HeaderText = styled.div`
    font-size: 3.2em;
    color: #2f2838;
    font-weight: 300;
`

const HeaderSpacer = styled.div`
    background: #595959;
    height: 34px;
    width: 2px;
    @media only screen and (max-width: 768px) {
        display: none;
    }
`

function Header() {
    const { state } = useContext(store)
    return (
        <HeaderContainer>
            <Link to="/">
                <HeaderText>
                    {/*eslint-disable-next-line*/}
                    <span>//the </span>
                    <span>
                        <b>stoke list.</b>
                    </span>
                </HeaderText>
            </Link>
            <HeaderLinks>
                <FlexRow>
                    <Link to="/">
                        <HeaderLinkText>Home</HeaderLinkText>
                    </Link>
                    <Link to="/garage">
                        <HeaderLinkText>Garage Map</HeaderLinkText>
                    </Link>
                    <HeaderSpacer />
                </FlexRow>
                <FlexRow>
                    {state.loggedIn && state.isAdmin && (
                        <Link to="/moderate">
                            <HeaderLinkText>Moderate</HeaderLinkText>
                        </Link>
                    )}
                    {state.loggedIn ? (
                        <Link to="/myposts">
                            <HeaderLinkText>Your Posts</HeaderLinkText>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <HeaderLinkText>Login</HeaderLinkText>
                        </Link>
                    )}
                    <Link to="/post">
                        <BlueButton>Create Post</BlueButton>
                    </Link>
                </FlexRow>
            </HeaderLinks>
        </HeaderContainer>
    )
}

export default Header
