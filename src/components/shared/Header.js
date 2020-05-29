import React, { useContext } from 'react'
import styled from 'styled-components'

import { store } from '../store'
import { BlueButton } from '../shared/Buttons'
import { HiddenLink } from '../shared/Text'

const HeaderContainer = styled.div`
    padding: 0% 6%;
    display: flex;
    flex-direction: row;
    min-height: 100px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 10px #00000026;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
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
`

function Header() {
    const { state } = useContext(store)
    return (
        <HeaderContainer>
            <HiddenLink to="/">
                <HeaderText>
                    {/*eslint-disable-next-line*/}
                    <span>//the </span>
                    <span>
                        <b>stoke list.</b>
                    </span>
                </HeaderText>
            </HiddenLink>
            <HeaderLinks>
                <HiddenLink to="/">
                    <HeaderLinkText>Home</HeaderLinkText>
                </HiddenLink>
                <HiddenLink to="/garage">
                    <HeaderLinkText>Garage Map</HeaderLinkText>
                </HiddenLink>
                <HeaderSpacer />
                {state.loggedIn && state.isAdmin && (
                    <HiddenLink to="/moderate">
                        <HeaderLinkText>Moderate</HeaderLinkText>
                    </HiddenLink>
                )}
                {state.loggedIn ? (
                    <HiddenLink to="/myposts">
                        <HeaderLinkText>Your Posts</HeaderLinkText>
                    </HiddenLink>
                ) : (
                    <HiddenLink to="/login">
                        <HeaderLinkText>Login</HeaderLinkText>
                    </HiddenLink>
                )}
                <HiddenLink to="/post">
                    <BlueButton>Create Post</BlueButton>
                </HiddenLink>
            </HeaderLinks>
        </HeaderContainer>
    )
}

export default Header
