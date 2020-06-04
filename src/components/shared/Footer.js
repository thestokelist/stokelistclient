import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const FooterContainer = styled.div`
    padding: 0% 6%;
    display: flex;
    height: 140px;
    background: #434653 0% 0% no-repeat padding-box;
    align-items: center;
    justify-content: space-between;
    @media only screen and (max-width : 768px) {
        flex-direction: column;
        height: auto;
    }
`

const FooterLinkText = styled.div`
    color: white;
    font-size: 1.1em;
    font-weight: 500;
`

const CopyrightText = styled.div`
    color: white;
    font-size: 1.1em;
    font-weight: 300;
    text-align: right;
`

const FooterText = styled.div`
    font-size: 2.4em;
    color: white;
`

function Footer() {
    return (
        <FooterContainer>
            <FooterLinkText>
                <Link to="/about">
                    <p>About</p>
                </Link>
                <Link to="/terms">
                    <p>Terms & Privacy</p>
                </Link>
                <Link to="/commandments">
                    <p>Stoke List Commandments</p>
                </Link>
            </FooterLinkText>
            {/*eslint-disable-next-line*/}
            <FooterText>
                //the <b>stoke list.</b>
            </FooterText>
            <CopyrightText>
                <div>Copyright 2009-2020</div>
                <div>All Rights Reserved</div>
            </CopyrightText>
        </FooterContainer>
    )
}

export default Footer
