import React, { Fragment } from 'react'

function PostSubmitLanding() {
    return (
        <Fragment>
            <div className="form-label">Please confirm your email address</div>
            <p>
                Your post has been submitted but will not appear until you
                confirm your email address
            </p>
            <p>
                If you are posting for the first time, there may be a delay
                whilst we verify your post
            </p>
        </Fragment>
    )
}

export default PostSubmitLanding
