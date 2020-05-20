import styled from 'styled-components'

export const GreyWhiteButton = styled.button`
    border-radius: 5px;
    background-color: white;
    border: solid grey 2px;
    padding: 8px;
    font-weight: bold;
    color: grey;
    text-align: center;
    margin: 0 auto;
    display: block;
    margin: 0em 1em;
`

export const WhiteWhiteButton = styled(GreyWhiteButton)`
    border: none;
`
export const SmallGreyWhiteButton = styled(GreyWhiteButton)`
    font-weight: normal;
    font-size: 11px;
`

export const BlueButton = styled.button`
    border-radius: 8px;
    background: #175E88 0% 0% no-repeat padding-box;
    padding: 0.5em 2em;
    color: white;
    text-align: center;
    font-size:20px;
    font-weight: 600;
    border: none

`

export const MoreButton = styled.button`
    width: 150px;
    height: 30px;
    background-color: blue;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    display: block;
    margin: 0 auto;
`

export const BigGreyButton = styled.button`
    border-radius: 5px;
    background-color: #383838;
    border: solid #383838 2px;
    padding: 8px 20px;
    font-weight: bold;
    color: white;
    text-align: center;
    display: block;
    margin: 1em 0;
`
