import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { BlueButton,  } from '../shared/Buttons'
import { WholeFormError } from '../shared/Forms'
import { endpoints } from '../../constants/endpoints'
import { apiPost } from '../../util/network'

//Form components
import LocationMap from './post/LocationMap'
import PriceGarage from './post/PriceGarage'
import PostEmail from './post/PostEmail'
import PostDescription from './post/PostDescription'
import PostTitle from './post/PostTitle'

function Post({ setPostDetails, setPostSubmitted }) {
    const { register, handleSubmit, errors, setValue, watch } = useForm() // initialise the hook

    const wholeFormError = useMemo(() => {
        return Object.keys(errors).length > 0
    }, [errors])

    const onSubmit = async (data) => {
        //TODO: Sanitize these inputs as could be html?
        const title = data.title
        const description = data.description
        const price =
            data.price === ''
                ? data.priceRadio === 'priceFree'
                    ? 'Free'
                    : ''
                : data.price
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
                ? new Date(data.startTime + ' ' + data.garageDate)
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
        setPostDetails(postData)
        console.log(postData)
        const response = await apiPost(endpoints.POSTS, postData)
        if (response) {
            setPostSubmitted(true)
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
            <LocationMap setValue={setValue} register={register} />
            <PostEmail errors={errors} register={register} watch={watch} />
            {/*TODO: Captcha*/}
            {/*TODO: Terms of Service */}
            <BlueButton type="submit">Submit</BlueButton>
        </form>
    )
}

export default Post
