import React from 'react'

//Generates a full width summary for a post, can be disabled
function GrayableContainer({ disabled, children }) {
    return (
        <div className="grid">
            {disabled && (
                <div className="grid-area-1 bg-white min-w-0 w-full h-full float-left bg-opacity-80 z-50" />
            )}
            <div className="grid-area-1 w-full min-w-0 bg-cream">{children}</div>
        </div>
    )
}

export default GrayableContainer
