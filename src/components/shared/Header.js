import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.div`
  padding: 2% 6%;
  width: 100%;
  box-sizing:border-box;
  font-size:2em;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    text-decoration: inherit;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: inherit;
        text-decoration: inherit;
    }
`;

function Header() {
    return (<div>
            {/* eslint-disable-next-line */}
            <HeaderContainer><StyledLink to="/">//THE <b>STOKE LIST</b></StyledLink></HeaderContainer>
            <hr />
        </div>)
}

export default Header