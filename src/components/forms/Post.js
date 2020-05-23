import React, { useMemo, useContext } from 'react'
import { useForm } from 'react-hook-form'

import { BlueButton } from '../shared/Buttons'
import { WholeFormError } from '../shared/Forms'
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

function Post({ post, responseCallback, buttonText }) {
    //Undo the mangling we did to get the data out of the form
    //to set it back up
    let formInit = Object.assign({}, post)
    if (post) {
        console.log(post)
        if (post.price === 'Free') {
            formInit.priceRadio = 'priceFree'
        } else if (post.startTime && post.endTime) {
            formInit.priceRadio = 'priceGarage'
            formInit.garageDate = getDatePortionForInput(post.startTime)
            formInit.startTime = getTimePortionForInput(post.startTime)
            formInit.endTime = getTimePortionForInput(post.endTime)
            //This goes last - post.price being null doesn't only means NA if we also have no garage data
        } else if (post.price === null) {
            formInit.priceRadio = 'priceNA'
        }  
        if (post.exactLocation) {
            formInit.lat = post.exactLocation.coordinates[1]
            formInit.lng = post.exactLocation.coordinates[0]
        }
    }

    const { state } = useContext(store)
    const { register, handleSubmit, errors, setValue, watch } = useForm({
        defaultValues: formInit,
    }) // initialise the hook

    const editMode = !!post

    const wholeFormError = useMemo(() => {
        return Object.keys(errors).length > 0
    }, [errors])

    const onSubmit = async (data) => {
        //TODO: Sanitize these inputs as could be html?
        const title = data.title
        const description = data.description
        let price = data.price
        if (data.priceRadio === 'priceFree') {
            price = 'Free'
        } else if (
            data.priceRadio === 'priceNA' ||
            data.priceRadio === 'priceGarage'
        ) {
            price = null
        }
        const location = data.location
        const exactLocation =
            data.lng !== '' && data.lat !== ''
                ? {
                      type: 'Point',
                      coordinates: [data.lng, data.lat],
                  }
                : null
        const email = data.email
        const startTime =
            data.startTime && data.garageDate
                ? new Date(data.startTime + ' ' + data.garageDate)
                : null
        const endTime =
            data.endTime && data.garageDate && startTime
                ? new Date(data.endTime + ' ' + data.garageDate)
                : null
        const isGarageSale = data.priceRadio === 'priceGarage'

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

        if (editMode) {
            delete postData.email
        }
        console.log(postData)
        let response
        if (editMode) {
            response = await authApiPut(
                `${endpoints.POSTS}${post.id}`,
                postData,
                state.token
            )
        } else {
            response = await apiPost(endpoints.POSTS, postData)
        }
        if (response) {
            responseCallback(postData)
            console.log('New post successfully submitted')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {wholeFormError && (
                <WholeFormError>
                    Aw, snap - you missed a step! See the alerts in red below
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
                <PostEmail errors={errors} register={register} watch={watch} />
            )}
            {/*TODO: Captcha*/}
            {/*TODO: Terms of Service */}
            <BlueButton type="submit">{buttonText}</BlueButton>
        </form>
    )
}

export default Post
