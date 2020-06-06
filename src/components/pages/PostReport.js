import React, { Fragment } from 'react'

import { Title } from '../shared/Text'
import ReportForm from '../forms/ReportForm'
import { Flash } from '../shared/Layouts'


function PostReport({ match }) {
    const postID = match.params.id

    return (
        <Fragment>
        <Title>Report Post</Title>
        <Flash>How does this post break The Stoke List Commandments?</Flash>
        <ReportForm id={postID}/>
        </Fragment>

    )
}

export default PostReport
