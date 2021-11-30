import React, { Fragment } from 'react'

function ValidationFailedLanding() {
    return (
        <Fragment>
            <div className="title">Validate Post</div>
            <p>Post validation failed - did you already validate this post?</p>
        </Fragment>
    )
}

export default ValidationFailedLanding
