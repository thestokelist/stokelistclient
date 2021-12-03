import React, { useMemo } from 'react'
import styled from 'styled-components'

const OutsideMarker = styled.div`
    position: absolute;
    top: -10px;
    left: -10px;
    width: 36px;
    height: 36px;
    line-height: 36px;
    border: 3px solid #175e88;
    border-radius: 36px;
    background-color: white;
    font-size: 1.6em;
    color: black;
    text-align: center;
    font-weight: 500;
`

const InsideMarker = styled(OutsideMarker)`
    top: 0px;
    left: 0px;
    font-size: 0.9em;
    border: 2px solid #175e88;
    font-weight: 400;
`

//Generates a full width summary for a post, can be disabled
function PostSummary({ post, markerNumber }) {
    const media = useMemo(() => {
        const media = post.media
        if (Array.isArray(media) && media.length > 0) {
            return media
        } else if (post.photoFileSize) {
            return [
                {
                    thumbLink: `${process.env.REACT_APP_LEGACY_IMG_URL}/photos/${post.id}/thumb.jpg`,
                },
            ]
        } else {
            return [
                {
                    thumbLink: `/logo.png`,
                },
            ]
        }
    }, [post])

    return (
        <div className="max-h-full h-full gray-border items-center justify-center flex relative w-40 max-w-40">
            {markerNumber ? (
                <OutsideMarker>{markerNumber}</OutsideMarker>
            ) : (
                media.length > 1 && (
                    <InsideMarker>{`+${media.length - 1}`}</InsideMarker>
                )
            )}
            <img
                className="max-h-full max-w-full w-auto h-auto object-contain"
                src={media[0].thumbLink}
                alt={'thumbnail'}
            />
        </div>
    )
}

export default PostSummary
