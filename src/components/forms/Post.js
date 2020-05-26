import React, { useMemo, useContext, useState, Fragment } from 'react'
import { useForm } from 'react-hook-form'

import { BlueButton, WhiteBlueButton } from '../shared/Buttons'
import { FlexBetweenRow } from '../shared/Layouts'
import { WholeFormError } from '../shared/Forms'
import PostDetail from '../posts/PostDetail'
import { endpoints } from '../../constants/endpoints'
import { apiPost, authApiPut } from '../../util/network'
import {
    getDatePortionForInput,
    getTimePortionForInput,
} from '../../util/datetime'
import { store } from '../store'

//Form components
import LocationMap from './post/LocationMap'
import PriceGarage from './post/PriceGarage'
import PostEmail from './post/PostEmail'
import PostDescription from './post/PostDescription'
import PostTitle from './post/PostTitle'
import Terms from './post/Terms'

function Post({ post, responseCallback, buttonText, editMode }) {

    const formInit = postToForm(post)
    const { state } = useContext(store)
    const { register, handleSubmit, errors, setValue, watch, reset } = useForm({
        defaultValues: formInit,
    })

    const [postPreview, setPostPreview] = useState(null)

    const wholeFormError = useMemo(() => {
        return Object.keys(errors).length > 0
    }, [errors])

    const formToPost = (formData) => {
        //TODO: Sanitize these inputs as could be html?
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
        const email = formData.email
        const startTime =
            formData.startTime && formData.garageDate
                ? new Date(formData.startTime + ' ' + formData.garageDate)
                : null
        const endTime =
            formData.endTime && formData.garageDate && startTime
                ? new Date(formData.endTime + ' ' + formData.garageDate)
                : null
        const isGarageSale = formData.priceRadio === 'priceGarage'

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
                formValues.garageDate = getDatePortionForInput(thePost.startTime)
                formValues.startTime = getTimePortionForInput(thePost.startTime)
                formValues.endTime = getTimePortionForInput(thePost.endTime)
                //This goes last - post.price being null doesn't only means NA if we also have no garage data
            } else if (thePost.price === null) {
                formValues.priceRadio = 'priceNA'
            }
            if (thePost.exactLocation) {
                formValues.lat = thePost.exactLocation.coordinates[1]
                formValues.lng = thePost.exactLocation.coordinates[0]
            }
        }
        return formValues
    }

    const onPreview = (data) => {
        const postData = formToPost(data)
        if (editMode) {
            delete postData.email
        }
        setPostPreview(postData)
    }

    const backToCreate = () => {
        //Reset the form with the values we used for the preview
        reset(postToForm(postPreview))
        //Clear the preview, so we return to the form
        setPostPreview(null)
    }

    const doSubmit = async (data) => {
        let response
        if (editMode) {
            response = await authApiPut(
                `${endpoints.POSTS}${post.id}`,
                postPreview,
                state.token
            )
        } else {
            response = await apiPost(endpoints.POSTS, postPreview)
        }
        if (response) {
            responseCallback(postPreview)
            console.log('New post successfully submitted')
        }
    }

    const getForm = () => {
        return (
            <form onSubmit={handleSubmit(onPreview)}>
                {wholeFormError && (
                    <WholeFormError>
                        Aw, snap - you missed a step! See the alerts in red
                        below
                    </WholeFormError>
                )}
                <PostTitle errors={errors} register={register} watch={watch} />
                <PostDescription errors={errors} register={register} />
                {/*TODO: Images/Media*/}
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
                {!editMode && (
                    <PostEmail
                        errors={errors}
                        register={register}
                        watch={watch}
                    />
                )}
                {/*TODO: Captcha*/}
                <Terms register={register} errors={errors} />
                <BlueButton type="submit">Preview</BlueButton>
            </form>
        )
    }

    const getPreview = () => {
        return (
            <Fragment>
                <FlexBetweenRow>
                    <WhiteBlueButton onClick={backToCreate}>
                        Edit
                    </WhiteBlueButton>
                    <BlueButton onClick={doSubmit}>{buttonText}</BlueButton>
                </FlexBetweenRow>
                <hr />
                <PostDetail postDetails={postPreview} notSubmitted={true} />
            </Fragment>
        )
    }

    return postPreview ? getPreview() : getForm()
}

export default Post
