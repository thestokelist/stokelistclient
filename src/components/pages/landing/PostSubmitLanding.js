import React, { Fragment } from 'react'
import { Label } from '../../shared/Forms'

function PostSubmitLanding() {
    return (
        <Fragment>
            <Label>Please confirm your email address</Label>
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
