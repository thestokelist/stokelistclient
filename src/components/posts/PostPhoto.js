import React, { useState, useMemo } from 'react'
import styled from 'styled-components'

import { FlexBetweenRow } from '../shared/Layouts'

const PostPhotoContainer = styled.div`
    width: 100%;
    max-height: 450px;
    height: 450px;
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
`

const FullHeightBetweenRow = styled(FlexBetweenRow)`
    height: 100%;
    max-height: 100%;
`

const PostImgContainer = styled.div`
    display: flex;
    margin: 5px 0px;
    box-shadow: 1px 1px 5px #0000001a;
    border: 1px solid #dce2e8;
    border-radius: 5px;
    justify-content: center;
    width: 70%;
    flex-direction: column;
    height: 100%;
    max-height: 100%;
`

const TextContainer = styled.div`
    display: flex;
    background: #434653 0% 0% no-repeat padding-box;
    color: #ffffff;
    border-radius: 0 0 5px 5px;
    height: 50px;
    padding: 0 1em;
`

const Sidebar = styled.div`
    display: flex;
    width: 25%;
    height: 100%;
    flex-direction: column;
    height: 100%;
    max-height: 100%;
`

const SidebarPhoto = styled.div`
    display: flex;
    margin: 5px 0px;
    box-shadow: 1px 1px 5px #0000001a;
    border: 1px solid #dce2e8;
    border-radius: 5px;
    flex-direction: column;
    height: 30%;
    max-height: 30%;
    margin-bottom: 3%;
    justify-content: center;
`

const SidebarPhotoImg = styled.img`
    max-height: 100%;
    max-width: 100%;
    height: auto;
    width: auto;
    object-fit: contain;
`

const PostImg = styled.img`
    max-height: 400px;
    max-width: 100%;
    height: auto;
    width: auto;
    object-fit: contain;
`

function PostPhoto({ postDetails }) {
    const [photoIndex, setPhotoIndex] = useState(0)

    const media = useMemo(() => {
        const media = postDetails.media
        if (Array.isArray(media) && media.length > 0) {
            return media
        } else if (postDetails.photoFileSize) {
            return [
                {
                    link: `${process.env.REACT_APP_LEGACY_IMG_URL}/photos/${postDetails.id}/original.jpg`,
                    thumbLink: `${process.env.REACT_APP_LEGACY_IMG_URL}/photos/${postDetails.id}/thumb.jpg`,
                    name: '',
                },
            ]
        } else {
            return null
        }
    }, [postDetails])

    const currentImgURL = () => {
        return media[photoIndex].link
    }

    const currentDescription = () => {
        return media[photoIndex].name
    }

    const remainingImages = useMemo(() => {
        if (Array.isArray(media) && media.length > 1) {
            //clone the array
            let remaining = media.map((x) => x)
            const DESIRED_PHOTOS = media.length > 3 ? 3 : media.length - 1
            const nextPhotoStart = photoIndex + 1

            //Show the next 3 images
            if (photoIndex + DESIRED_PHOTOS < media.length) {
                //Assignment here, get the 3 items returned by the splice
                remaining = remaining.splice(nextPhotoStart, DESIRED_PHOTOS)
            } else {
                const endPart = remaining.slice(nextPhotoStart)
                const startPart = remaining.slice(
                    0,
                    DESIRED_PHOTOS - endPart.length
                )
                console.log('endPart', endPart)
                console.log('startPart', startPart)
                remaining = endPart.concat(startPart)
            }

            return remaining
        } else {
            return []
        }
    }, [media, photoIndex])

    const incrementIndex = (increment) => {
        let newIndex = photoIndex + increment
        if (newIndex >= media.length) {
            newIndex -= media.length
        }
        setPhotoIndex(newIndex)
    }

    return media ? (
        <PostPhotoContainer>
            <FullHeightBetweenRow>
                <PostImgContainer>
                    <PostImg src={currentImgURL()} alt="Post" />
                    <TextContainer>
                        <p>{` ${photoIndex + 1}/${
                            media.length
                        } ${currentDescription()}`}</p>
                    </TextContainer>
                </PostImgContainer>
                <Sidebar>
                    {remainingImages.map((media, index) => (
                        <SidebarPhoto
                            key={media.id}
                            onClick={() => incrementIndex(index + 1)}
                        >
                            <SidebarPhotoImg src={media.thumbLink} />
                        </SidebarPhoto>
                    ))}
                </Sidebar>
            </FullHeightBetweenRow>
        </PostPhotoContainer>
    ) : null
}

export default PostPhoto
