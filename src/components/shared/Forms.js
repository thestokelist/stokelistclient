import styled from 'styled-components'

export const Label = styled.div`
    font-weight: 500;
    color: #175e88;
    margin: 0.2em 0em;
`

export const SubLabel = styled.span`
    font-weight: 400;
    font-size: 1em;
    color: #175e88;
`

export const Input = styled.input`
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 1px 1px 5px #0000001a;
    border: 1px solid #dce2e8;
    border-radius: 5px;
    height: 30px;
`

export const HalfWidthInput = styled(Input)`
    width: 50%;
    margin-right: 1em;
`

export const InputContainer = styled.div`
    margin-bottom:1em;
`

export const RadioInput = styled.input``

export const RadioText = styled.span`
    font-size: 0.9em;
    color: #434653;
    margin-left:0.1em;
    margin-right:1em;
`

export const FormError = styled.div`
    color: #C30C2F;
    font-size:0.8em;
`

export const WholeFormError = styled(FormError)`
    font-weight:bold;
    margin-bottom:1em;
    margin-top:-1em;
`


