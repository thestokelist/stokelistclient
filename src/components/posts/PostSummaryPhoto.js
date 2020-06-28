import React, { useMemo } from 'react'
import styled from 'styled-components'

const PostImageContainer = styled.div`
    max-height: 100%;
    height:100%
    border-right: 1px solid #dce2eb;
    border-radius: 5px 0px 0px 5px;
    max-width: 160px;
    width: 160px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PostImage = styled.img`
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
`

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
                    link: `http://list.thestoke.ca/photos/${post.id}/thumb.jpg`,
                },
            ]
        } else {
            return [
                {
                    link: `/logo.png`,
                },
            ]
        }
    }, [post])

    return (
        <PostImageContainer>
            {markerNumber ? (
                <OutsideMarker>{markerNumber}</OutsideMarker>
            ) : (
                media.length > 1 && <InsideMarker>{`+${media.length-1}`}</InsideMarker>
            )}

            <PostImage src={media[0].link} alt={'thumbnail'} />
        </PostImageContainer>
    )
}

export default PostSummary
