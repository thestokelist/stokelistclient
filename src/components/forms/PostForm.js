import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

import Loading from '../shared/Loading'
import { endpoints } from '../../constants/endpoints'

import {
    getDatePortionForInput,
    getTimePortionForInput,
} from '../../util/datetime'
import { store } from '../store'
import { useNetworkRequest } from '../../hooks'

//Form components
import LocationMap from './post/LocationMap'
import PriceGarage from './post/PriceGarage'
import PostEmail from './post/PostEmail'
import PostDescription from './post/PostDescription'
import PostTitle from './post/PostTitle'
import Terms from './post/Terms'
import Upload from './post/Upload'

function PostForm({ post, responseCallback, buttonText, editMode }) {
    const formInit = postToForm(post)
    const { state } = useContext(store)
    const {
        control,
        register,
        handleSubmit,
        errors,
        setValue,
        watch,
    } = useForm({
        defaultValues: formInit,
    })
    const [submitError, setSubmitError] = useState(0)
    const [networkLoading, setNetworkLoading] = useState(false)
    const { executeRecaptcha } = useGoogleReCaptcha()
    const { authApiPut, authApiPost, apiPost } = useNetworkRequest()
    const wholeFormError = Object.keys(errors).length > 0

    const formToPost = (formData) => {
        const title = formData.title
        const description = formData.description
        let price = formData.price
        if (formData.priceRadio === 'priceFree') {
            price = 'Free'
        } else if (
            formData.priceRadio === 'priceNA' ||
            formData.priceRadio === 'priceGarage'
        ) {
            price = null
        }
        const location = formData.location
        const exactLocation =
            formData.lng !== '' && formData.lat !== ''
                ? {
                      type: 'Point',
                      coordinates: [formData.lng, formData.lat],
                  }
                : null
        const email = state.loggedIn ? state.email : formData.email
        const startTime =
            formData.startTime && formData.garageDate
                ? new Date(formData.startTime + ' ' + formData.garageDate)
                : null
        const endTime =
            formData.endTime && formData.garageDate && startTime
                ? new Date(formData.endTime + ' ' + formData.garageDate)
                : null
        const isGarageSale = formData.priceRadio === 'priceGarage'
        const media = formData.media

        const postData = {
            title,
            description,
            price,
            location,
            exactLocation,
            email,
            isGarageSale,
            startTime,
            endTime,
            media,
        }

        return postData
    }

    //Use function rather than const here to hoist for use in form init
    function postToForm(thePost) {
        //Undo the mangling we did to get the data out of the form
        //to set it back up
        let formValues = Object.assign({}, thePost)
        if (thePost) {
            if (thePost.price === 'Free') {
                formValues.priceRadio = 'priceFree'
            } else if (thePost.startTime && thePost.endTime) {
                formValues.priceRadio = 'priceGarage'
                formValues.garageDate = getDatePortionForInput(
                    thePost.startTime
                )
                formValues.startTime = getTimePortionForInput(thePost.startTime)
                formValues.endTime = getTimePortionForInput(thePost.endTime)
                //This goes last - post.price being null doesn't only means NA if we also have no garage data
            } else if (thePost.price === null) {
                formValues.priceRadio = 'priceNA'
            } else {
                formValues.priceRadio = ''
            }
            if (thePost.exactLocation) {
                formValues.lat = thePost.exactLocation.coordinates[1]
                formValues.lng = thePost.exactLocation.coordinates[0]
            }
        }
        return formValues
    }

    const doSubmit = async (data) => {
        setSubmitError(0)
        let response
        if (editMode) {
            response = await authApiPut(
                `${endpoints.POSTS}${post.id}`,
                data,
                state.token
            )
        } else if (state.loggedIn) {
            response = await authApiPost(endpoints.POSTS, data, state.token)
        } else {
            response = await apiPost(endpoints.POSTS, data)
        }
        if (response) {
            responseCallback(data)
            console.log('New post successfully submitted')
        } else {
            setSubmitError(response.status)
        }
    }

    const doCaptchaAndSubmit = async (data) => {
        if (networkLoading === false) {
            const postData = formToPost(data)
            if (editMode) {
                delete postData.email
            }
            setNetworkLoading(true)
            const submitPost = Object.assign({}, postData)
            if (!editMode) {
                const token = await executeRecaptcha('post')
                submitPost['g-recaptcha-response'] = token
            }
            await doSubmit(submitPost)
            setNetworkLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(doCaptchaAndSubmit)}>
            {wholeFormError && (
                <div className="form-error font-bold mb-2">
                    Aw, snap - you missed a step! See the alerts in red below
                </div>
            )}
            <PostTitle errors={errors} register={register} watch={watch} />
            <PostDescription
                errors={errors}
                register={register}
                setValue={setValue}
                watch={watch}
            />
            <Upload errors={errors} register={register} control={control} />
            <PriceGarage
                errors={errors}
                setValue={setValue}
                watch={watch}
                register={register}
            />
            <LocationMap
                setValue={setValue}
                register={register}
                watch={watch}
            />
            {!editMode && !state.loggedIn && (
                <PostEmail errors={errors} register={register} watch={watch} />
            )}
            {!editMode && <Terms register={register} errors={errors} />}
            {submitError && (
                submitError === 498 ? (
                <div className="form-error">
                    <p>The system thinks you're a robot!</p>
                    <p>Is this a fresh browser window? To convince it you're not, go do some non-robot things:</p>
                    <ul>
                        <li>check your email</li>
                        <li>read the news</li>
                    </ul>
                    <p>If this happens continually, please email <a href="mailto:simon@simonwex.com">simon@simonwex.com</a>.</p>
              </div>
                ) : (
                <div className="form-error">Error submitting post</div>
                )
            )}
            <button className="btn-blue" type="submit">
                {networkLoading ? <Loading /> : buttonText}
            </button>
        </form>
    )
}

export default PostForm
