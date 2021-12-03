import React from 'react'

//Generates a full width summary for a post, can be disabled
function GrayableContainer({ disabled, children }) {
    return (
        <div className="grid">
            {disabled && (
                <div className="grid-area-1 bg-white w-full h-full float-left bg-opacity-80" />
            )}
            <div className="grid-area-1">{children}</div>
        </div>
    )
}

export default GrayableContainer
