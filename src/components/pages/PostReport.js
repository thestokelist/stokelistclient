import React, { Fragment } from 'react'

import ReportForm from '../forms/ReportForm'
import { Flash } from '../shared/Layouts'


function PostReport({ match }) {
    const postID = match.params.id

    return (
        <Fragment>
        <div className="title">Report Post</div>
        <Flash>How does this post break The Stoke List Commandments?</Flash>
        <ReportForm id={postID}/>
        </Fragment>

    )
}

export default PostReport
