import styled from 'styled-components'

export const StokeListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width:1240px;
    margin:auto;
`

export const BodyContainer = styled.div`
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

export const ResponsiveBetweenRow = styled(FlexBetweenRow)`
    /* Small Devices, Tablets */
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
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

export const NoEscape = styled.div`
    /* https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/ */
    overflow-wrap: break-word;
    word-wrap: break-word;

    -ms-word-break: break-all;
    /* This is the dangerous one in WebKit, as it breaks things wherever */
    word-break: break-all;
    /* Instead use this non-standard one: */
    word-break: break-word;

    /* Adds a hyphen where the word breaks, if supported (No Blink) */
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
`
