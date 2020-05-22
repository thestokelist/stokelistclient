import React from 'react'
import styled from 'styled-components'
import { FaMapMarker } from 'react-icons/fa'

const FlexUnderline = styled.u`
    display: flex;
`
const LocationText = styled.div`
    font-weight: normal;
    font-size: 0.9em;
    margin: 5px 0px;
    color: #175e88;
`

function PostLocation({ postDetails }) {
    const getText = () => {
        const text = <LocationText>{postDetails.location}</LocationText>
        if (
            postDetails.exactLocation &&
            postDetails.exactLocation.coordinates
        ) {
            const href = `https://www.google.com/maps/search/?api=1&query=${postDetails.exactLocation.coordinates[1]},${postDetails.exactLocation.coordinates[0]}`
            return (
                <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={href}
                >
                    <FlexUnderline>
                        {text}
                        <FaMapMarker color={'#175E88'} />
                    </FlexUnderline>
                </a>
            )
        } else {
            return text
        }
    }

    return getText()
}

export default PostLocation
