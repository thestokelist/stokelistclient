import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

import PostForm from '../forms/PostForm'
import { formTypes } from '../../constants/forms'

function PostCreate() {
    const [postDetails, setPostDetails] = useState(null)
    const [formState, setFormState] = useState(formTypes.POST)
    const reCaptchaKey = process.env.REACT_APP_CAPTCHA_KEY

    const getTitle = () => {
        let title = 'Create Post'
        if (formState === formTypes.PREVIEW) {
            title = 'Preview Post'
        }
        return title
    }

    return (
        <Fragment>
            <div className="lg:my-4">
                <span className="title">{getTitle()}</span>
            </div>

            {formState === formTypes.PREVIEW ? (
                <div className="mb-4 text-slate font-bold">
                    <p>
                        This is a preview of how your post will look once it's
                        posted.
                    </p>
                    <p>
                        If you're happy then hit Submit to post it the The Stoke
                        List. If there's something you want to change, hit Edit
                        instead.
                    </p>
                </div>
            ) : (
                ''
            )}
            {postDetails ? (
                <Redirect to="/submitted" />
            ) : (
                <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
                    <PostForm
                        responseCallback={setPostDetails}
                        buttonText="Submit"
                        stateCallback={setFormState}
                    />
                </GoogleReCaptchaProvider>
            )}
        </Fragment>
    )
}

export default PostCreate
