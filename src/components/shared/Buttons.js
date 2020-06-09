import styled from 'styled-components'

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
export const WhiteRedButton = styled(WhiteBlueButton)`
    border: 1px solid #C30C2F;
    color: #C30C2F;
`

export const CenteredWhiteBlueButton = styled(WhiteBlueButton)`
    margin: 0 auto;
`

export const RedButton = styled(WhiteBlueButton)`
    border: 1px solid #C30C2F;
    background: #C30C2F 0% 0% no-repeat padding-box;
    color: #ffffff;
`
