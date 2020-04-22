import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GreyWhiteButton } from '../shared/Buttons'

const HeaderContainer = styled.div`
    font-size: 2em;
`

const HiddenLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    text-decoration: inherit;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
        color: inherit;
        text-decoration: inherit;
    }
`

const HeaderLinks = styled.div`
    float: right;
    font-size: 14px;
    display: flex;
    align-items: center;
`

const WhiteGreyLink = styled.div`
    font-size: 14px;
    color: grey;
    margin: 0em 1em;
    font-weight: bold;
`

function Header() {
    return (
        <Fragment>
            <HeaderContainer>
                <HeaderLinks>
                    <HiddenLink to="/">
                        <WhiteGreyLink>Latest Posts</WhiteGreyLink>
                    </HiddenLink>
                    <HiddenLink to="/garage">
                        <WhiteGreyLink>Garage Sale Map</WhiteGreyLink>
                    </HiddenLink>{' '}
                    <WhiteGreyLink>|</WhiteGreyLink>
                    <HiddenLink to="/myposts">
                        <WhiteGreyLink>My Posts</WhiteGreyLink>
                    </HiddenLink>
                    <HiddenLink to="/post">
                        <GreyWhiteButton>Create Post</GreyWhiteButton>
                    </HiddenLink>
                </HeaderLinks>
                {/* eslint-disable-next-line */}
                <HiddenLink to="/">
                    //THE <b>STOKE LIST</b>
                </HiddenLink>
            </HeaderContainer>
            <hr />
        </Fragment>
    )
}

export default Header
