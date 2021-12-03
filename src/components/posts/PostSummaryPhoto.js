import React, { useMemo } from 'react'

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
        <div className="max-h-full items-center justify-center flex relative w-40 max-w-40">
            {markerNumber ? (
                <div className="absolute text-black text-center font-medium bg-white border-2 border-solid border-blue rounded-full w-8 h-8 leading-8 -top-4 -left-4">
                    {markerNumber}
                </div>
            ) : (
                media.length > 1 && (
                    <div className="absolute text-black text-center text-sm font-medium bg-white border-2 border-solid border-blue rounded-full w-8 h-8 leading-8 -top-0 -left-0">{`+${
                        media.length - 1
                    }`}</div>
                )
            )}
            <img
                className="max-h-full max-w-full contained"
                src={media[0].thumbLink}
                alt={'thumbnail'}
            />
        </div>
    )
}

export default PostSummary
