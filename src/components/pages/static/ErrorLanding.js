import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function ErrorLanding() {
    return (
        <Fragment>
            <div className="title">Oops</div>
            <p>
                We couldn't find the page. Perhaps you could try going{' '}
                <Link to="/">
                    <u>Home</u>
                </Link>
                ?
            </p>
        </Fragment>
    )
}

export default ErrorLanding
