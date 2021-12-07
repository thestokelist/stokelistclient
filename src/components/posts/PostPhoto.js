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
        <div className="w-full max-h-112 h-112 flex flex-col">
            <div className="flexed-row justify-between h-full max-h-full">
                <div className="bg-white flex shadow gray-border rounded justify-center w-3/4 flex-col h-full max-h-full">
                    <img
                        className="contained max-w-full max-h-102 my-auto p-2"
                        src={currentImgURL()}
                        alt="post"
                    />
                    <div className="flex font-bold bg-slate text-white rounded-b h-10 p-2">
                        <p>{media.length === 1 ? '' : ` ${photoIndex + 1}/${
                            media.length
                        } - `} {currentDescription()}</p>
                    </div>
                </div>
                <div className="flex w-1/4 h-full flex-col h-full max-h-full overflow-y-auto p-2 scrollbar">
                    {remainingImages.map((media, index) => (
                        <div
                            className="flex my-2 shadow gray-border rounded flex-col h-1/3 max-h-1/3 mb-4 justify-center"
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
