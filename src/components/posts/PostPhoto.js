import React, { useState, useMemo } from 'react'

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
            return media
        } else {
            return []
        }
    }, [media])

    return media ? (
        <div className="max-w-full w-full lg:max-h-112 lg:h-112 flex flex-col">
            <div className="flex flex-col lg:flex-row items-center justify-between h-full max-h-full">
                <div className="bg-white flex shadow gray-border rounded justify-center w-full min-w-fit lg:min-w-0 lg:w-3/4 flex-col h-112 max-h-full">
                    <img
                        key={photoIndex}
                        className="w-auto h-auto object-contain max-w-full w-full max-h-102 lg:max-h-102 my-auto p-2"
                        src={currentImgURL()}
                        alt="post"
                    />
                    <div className="flex font-bold bg-slate text-white rounded-b h-10 p-2">
                        <p>
                            {media.length === 1
                                ? ''
                                : ` ${photoIndex + 1}/${media.length} - `}{' '}
                            {currentDescription()}
                        </p>
                    </div>
                </div>
                <div className="flex w-full lg:w-1/4 min-h-40 lg:min-h-auto h-auto lg:h-full overflow-y-hidden overflow-x-scroll lg:overflow-x-hidden lg:overflow-y-auto scrollbar mt-2 lg:mt-0 justify-between items-center flex-row flex-nowrap lg:flex-col p-2">
                        {remainingImages.map((media, index) => (
                            <div
                                className="flex-shrink-0 flex w-40 lg:w-full h-40 lg:h-1/3 lg:max-h-1/3 m-2 shadow gray-border rounded mb-4 justify-center bg-white max-w-40"
                                key={media.id}
                                onClick={() => setPhotoIndex(index)}
                            >
                                <img
                                    className="contained max-w-full max-h-full"
                                    src={media.thumbLink}
                                    alt="thumbnail"
                                />
                            </div>
                        ))}
                </div>

            </div>
        </div>
    ) : null
}

export default PostPhoto
