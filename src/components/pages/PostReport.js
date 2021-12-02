import React, { Fragment } from 'react'

import ReportForm from '../forms/ReportForm'

function PostReport({ match }) {
    const postID = match.params.id

    return (
        <Fragment>
            <div className="title">Report Post</div>
            <div className="flash">
                How does this post break The Stoke List Commandments?
            </div>
            <ReportForm id={postID} />
        </Fragment>
    )
}

export default PostReport
