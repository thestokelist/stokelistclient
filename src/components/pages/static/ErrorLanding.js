import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Title } from '../../shared/Text'

function ErrorLanding() {
    return (
        <Fragment>
            <Title>Oops</Title>
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
