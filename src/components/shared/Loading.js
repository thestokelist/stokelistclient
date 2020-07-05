import React from 'react'
import styled from 'styled-components'
import { FaSpinner } from 'react-icons/fa'

const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

function Loading({size}) {
    return (
        <LoadingContainer>
             <FaSpinner size={size} className="fa-spin" />
        </LoadingContainer>
    )
}

Loading.defaultProps = {
    size: 40 
}

export default Loading
