import React, { Fragment } from 'react'
import { Title } from '../../shared/Text'

function ValidationFailedLanding() {
    return (
        <Fragment>
            <Title>Validate Post</Title>
            <p>Post validation failed - did you already validate this post?</p>
        </Fragment>
    )
}

export default ValidationFailedLanding
