import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Title = styled.div`
    font-weight: 500;
    font-size: 1.5em;
    margin: 20px 0px;
    color: #175E88;
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