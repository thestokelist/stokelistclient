import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import validator from 'email-validator'
import { Map, TileLayer, Marker } from 'react-leaflet'
import ReactModal from 'react-modal'
import { useModal } from 'react-modal-hook'

import { Title } from '../shared/Text'
import { BigGreyButton, GreyWhiteButton } from '../shared/Buttons'
import { Label, Input } from '../shared/Forms'
import { AlignRight } from '../shared/Layouts'
import { endpoints } from '../../constants/endpoints'
import { apiPost } from '../../util/network'

const Description = styled.textarea``

const SubLabel = styled.span`
    font-weight: normal;
    font-size: 12px;
`

const MapContainer = styled.div`
    height: 350px;
    width: 60%;
    margin: 1em 0;
`

function Post({ setPostDetails, setPostSubmitted }) {
    const [isGarageSale, setIsGarageSale] = useState(false)
    const { register, handleSubmit, errors, setValue, watch } = useForm() // initialise the hook
    const modalStyles = { overlay: { zIndex: 9999 } }
    const [showModal, hideModal] = useModal(() => (
        <ReactModal isOpen style={modalStyles}>
            <Title>Post Submitted</Title>
            It will not display on The Stoke List until you verify your email.
            Check your inbox now!
            <AlignRight>
                <GreyWhiteButton onClick={hideModalAndSetPostSubmitted}>
                    I Understand
                </GreyWhiteButton>
            </AlignRight>
        </ReactModal>
    ))

    const hideModalAndSetPostSubmitted = () => {
        setPostSubmitted(true)
        hideModal()
    }

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
            showModal()
            //TODO: Redirect to latest posts
            console.log('New post successfully submitted')
        }
    }

    const position = [50.9981, -118.1957]

    const updatePriceForm = (e) => {
        if (e.target.checked) {
            //A price radio box was checked, so clear price text field
            setValue('price', '')
        } else {
            //Text was entered, so clear both price radio boxes
            setValue('priceRadio', null)
        }
    }

    const updateGarageSale = (e) => {
        const isSet = e.target.value === 'yes'
        setIsGarageSale(isSet)
    }

    const updateLocation = async (e) => {
        try {
            const location = e.target.getLatLng()
            setValue('lat', location.lat)
            setValue('lng', location.lng)
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse.php?format=json&lat=${location.lat}&lon=${location.lng}&zoom=18&addressdetails=0`
            )
            const json = await res.json()
            const displayName = json.display_name.split(',')
            let suggestion = displayName[0]
            //If the suggestion is just a street number, get the second bit too
            if (!isNaN(suggestion)) {
                suggestion = displayName[0] + displayName[1]
            }
            setValue('location', suggestion)
        } catch {
            //Do nothing, if any of this fails just don't update the text
        }
    }

    const validatePrice = () => {
        const price = watch('price')
        const priceRadio = watch('priceRadio')
        //Validation fails if there is no price entered, nor a radio button selected
        return !(price === '' && priceRadio === '')
    }

    const validateEmail = () => {
        const email = watch('email')
        return validator.validate(email)
    }

    const getGarageDateComponent = () => {
        return (
            <Fragment>
                <Label>When's it happening?</Label>
                From
                <Input
                    type="time"
                    name="startTime"
                    ref={register({ required: true })}
                />
                To
                <Input
                    type="time"
                    name="endTime"
                    ref={register({ required: true })}
                />
                On
                <Input
                    type="date"
                    name="garageDate"
                    ref={register({ required: true })}
                />
                {(errors.startTime || errors.endTime || errors.garageDate) &&
                    'Start time, Finish time and date are all required for a garage sale.'}
            </Fragment>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Label>Post Title</Label>
            <Input
                name="title"
                placeholder="50 characters max"
                ref={register({ required: true, maxLength: 50 })}
            />
            {errors.title &&
                errors.title.type === 'required' &&
                'Title is required.'}
            {errors.title &&
                errors.title.type === 'maxLength' &&
                'Title has a max length of 50 characters.'}
            <Label>Is this a garage sale</Label>
            <Input
                type="radio"
                name="garageSaleRadio"
                value="no"
                ref={register()}
                onChange={updateGarageSale}
                checked={!isGarageSale}
            />
            No
            <Input
                type="radio"
                name="garageSaleRadio"
                value="yes"
                ref={register()}
                onChange={updateGarageSale}
                checked={isGarageSale}
            />
            Yes
            {isGarageSale && getGarageDateComponent()}
            <Label>Post Description</Label>
            <Description
                rows="10"
                cols="80"
                name="description"
                ref={register({ required: true })}
            />
            {errors.description && 'Description is required.'}
            {/*TODO: Images/Media*/}
            {!isGarageSale && (
                <Fragment>
                    <Label>Add a Price</Label>
                    $
                    <Input
                        type="numeric"
                        name="price"
                        ref={register({ validate: validatePrice })}
                        onChange={updatePriceForm}
                    />
                    <Input
                        type="radio"
                        name="priceRadio"
                        value="priceNA"
                        ref={register()}
                        onChange={updatePriceForm}
                    />
                    Not Applicable
                    <Input
                        type="radio"
                        name="priceRadio"
                        value="priceFree"
                        ref={register()}
                        onChange={updatePriceForm}
                    />
                    Free
                    <br />
                    {errors.price && 'Enter a price or select an option'}
                </Fragment>
            )}
            <Label>Add Location</Label>
            <Input name="location" ref={register} />
            <Input type="hidden" name="lat" ref={register} />
            <Input type="hidden" name="lng" ref={register} />
            <MapContainer>
                <Map center={position} zoom={13} style={{ height: '350px' }}>
                    <TileLayer
                        name="OSM Base Map"
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        draggable={true}
                        onDragend={updateLocation}
                        position={position}
                    />
                </Map>
            </MapContainer>
            <Label>
                Your Contact Email
                <SubLabel> - This will not be published</SubLabel>
            </Label>
            <Input
                type="email"
                name="email"
                ref={register({
                    required: true,
                    validate: validateEmail,
                })}
            />
            {errors.email &&
                errors.email.type === 'required' &&
                'Email is required.'}
            {errors.email &&
                errors.email.type === 'validate' &&
                'Must be an email address.'}
            {/*TODO: Captcha*/}
            {/*TODO: Terms of Service */}
            <BigGreyButton type="submit">Submit</BigGreyButton>
        </form>
    )
}

export default Post
