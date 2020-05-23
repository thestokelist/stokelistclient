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
    font-size: 0.9em;
`

export const BlueButton = styled.button`
    border-radius: 8px;
    background: #175e88 0% 0% no-repeat padding-box;
    padding: 0.5em 2em;
    color: white;
    text-align: center;
    font-size: 1.2em;
    font-weight: 600;
    border: none;
    box-shadow: 0px 3px 6px #00000034;
`

export const WhiteBlueButton = styled.button`
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000033;
    border: 1px solid #175e88;
    border-radius: 8px;
    padding: 0.5em 2em;
    color: #175e88;
    text-align: center;
    font-size: 1em;
    font-weight: 600;
`

export const CenteredWhiteBlueButton = styled(WhiteBlueButton)`
    margin: 0 auto;
`
