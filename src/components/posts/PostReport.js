import React from 'react'

//Generates a full width summary for a post, can be disabled
function PostReport({ report }) {
    return (
        <div className="my-4 flex flex-col">
            {['Reason','Comment'].map((word) => (
                <div className="flexed-row">
                    <div className="text-sm text-slate font-bold w-40">{word}</div>
                    <div className="text-sm text-slate flex-grow">
                        <b>{report[word.toLowerCase()]}</b>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostReport
