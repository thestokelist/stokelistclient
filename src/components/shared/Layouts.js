import styled from 'styled-components'

export const StokeListContainer = styled.div`
    padding: 2% 6%;
    width: 100%;
    box-sizing: border-box;
    flex-grow: 1;
    background: #f8f8f8 0% 0% no-repeat padding-box;
`

export const FlexFullHeightColumn = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const FlexBetweenRow = styled(FlexRow)`
    justify-content: space-between;
`

export const Flash = styled.div`
    width: 100%;
    vertical-align: middle;
    padding: 0.2em;
    color: #434653;
    font-size: 1em;
    font-weight: bold;
    margin-bottom: 0.5em;
`

export const AlignRight = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`

export const ButtonContainer = styled(FlexBetweenRow)`
    width: 250px;
`
