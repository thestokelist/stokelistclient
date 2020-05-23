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
    border: solid grey 1px;
    background-color: lightgoldenrodyellow;
    vertical-align: middle;
    padding: 0.2em;
`

export const AlignRight = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`

export const DisabledOverlay = styled.div`
    float: left;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 0.8;
    grid-area: 1 / 1;
`

export const GridLayout = styled.div`
    display: grid;
`

export const HalfWidth = styled.div`
    flex: 50%;
    padding: 0 1em;
    box-sizing: border-box;
`
