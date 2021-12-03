import React from 'react'
import { FaMapMarker } from 'react-icons/fa'

function PostLocation({ postDetails }) {
    const getText = () => {
        const text = <div className="text-sm text-blue mx-2">{postDetails.location}</div>
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
                    <u className="flex">
                        {text}
                        <FaMapMarker color={'#175E88'} />
                    </u>
                </a>
            )
        } else {
            return text
        }
    }

    return getText()
}

export default PostLocation
