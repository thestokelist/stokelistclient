import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

import { Title } from '../shared/Text'
import PostForm from '../forms/PostForm'

function PostCreate() {
    const [postDetails, setPostDetails] = useState(null)
    const reCaptchaKey = process.env.REACT_APP_CAPTCHA_KEY

    return (
        <Fragment>
            <Title>Create Post</Title>
            {postDetails ? (
                <Redirect to="/submitted" />
            ) : (
                <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
                    <PostForm
                        responseCallback={setPostDetails}
                        buttonText="Submit"
                    />
                </GoogleReCaptchaProvider>
            )}
        </Fragment>
    )
}

export default PostCreate
