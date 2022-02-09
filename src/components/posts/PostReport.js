import React from 'react'

//Generates a full width summary for a post, can be disabled
function PostReport({ report }) {
    return (
        <div className="my-4 flex flex-col w-full">
            {['Reason', 'Comment'].map((word) => (
                <div className="flexed-row" key={word}>
                    <div className="text-lg text-slate font-bold align-top w-40">
                        {word}
                    </div>
                    <div className="text-lg text-slate flex-grow">
                        {report[word.toLowerCase()]}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostReport
