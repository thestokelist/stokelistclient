import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

function PostSubmitLandingLoggedIn() {
    return (
        <Fragment>
            <div className="text-xl form-label">Your post has been submitted</div>
            <div>
                <p>
                    Most posts will appear on the list immediately. To go
                    back to the list, click <NavLink to="/">here</NavLink>. You will be redirected in 10 seconds.
                </p>
            </div>
        </Fragment>
    )
}

export default PostSubmitLandingLoggedIn
