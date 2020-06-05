import React from 'react'
import styled from 'styled-components'

const DisabledOverlay = styled.div`
    float: left;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 0.8;
    grid-area: 1 / 1;
`

const GridLayout = styled.div`
    display: grid;
`

const ContentContainer = styled.div`
    grid-area: 1 / 1;
`

//Generates a full width summary for a post, can be disabled
function GrayableContainer({ disabled, children }) {
    return (
        <GridLayout>
            {disabled && <DisabledOverlay />}
            <ContentContainer>{children}</ContentContainer>
        </GridLayout>
    )
}

export default GrayableContainer
