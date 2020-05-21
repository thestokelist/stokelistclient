import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Title = styled.div`
    font-weight: bold;
    font-size: 1.2em;
    margin: 20px 0px;
`
export const HiddenLink = styled(Link)`
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