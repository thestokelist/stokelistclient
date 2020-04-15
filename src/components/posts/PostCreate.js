//eslint-disable-next-line
import React, {useEffect, useState} from 'react'
//eslint-disable-next-line
import styled from 'styled-components'
import { useForm } from 'react-hook-form';

import { Title } from "../shared/Text"
import { BigGreyButton } from "../shared/Buttons"

import { Map, TileLayer, Marker } from 'react-leaflet'

const Label = styled.div`
font-weight:bold;
margin-top:10px;
`
const Input = styled.input`
border-radius:5px;
background-color:white;
border: solid grey 1px;
`

const Description = styled.textarea`
`

const SubLabel = styled.span`
font-weight:normal;
font-size:12px;
`

const MapContainer = styled.div`
  height: 350px;
  width: 60%;
  margin: 1em 0;
`;

function PostCreate() {

    const { register, handleSubmit, errors, setValue } = useForm(); // initialise the hook
    const onSubmit = data => {
        console.log(data);
    };

    const position = [50.9981, -118.1957]

    const checkPrice = e => {
        if (e.target.checked) {
            //A price radio box was checked, so clear price text field
            setValue('price','')
        } else {
            //Text was entered, so clear both price radio boxes
            setValue('priceRadio',null)
        }
    }

    const updateLocation = async e => {
        const location = e.target.getLatLng();
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse.php?format=json&lat=${location.lat}&lon=${location.lng}&zoom=18&addressdetails=0`)
        const json = await res.json()
        console.log(json)
        const suggestion = json.display_name.split(',', 1)[0]
        setValue('location',suggestion)
    }

    return (<div>
                <Title>Create Post</Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Label>Post Title</Label>
                    <Input name="title" placeholder="50 characters max" 
                        ref={register({ required: true, maxLength: 50 })} 
                    />
                    {errors.title && 'Title is required.'}

                    {/*TODO: Garage Sale?*/}
                
                    <Label>Post Description</Label>
                    <Description rows="10" cols="80" name="description" 
                        ref={register({ required: true })
                    } />
                    {errors.description && 'Description is required.'}

                    {/*TODO: Images/Media*/}

                    <Label>Add a Price</Label>
                    $<Input name="price" ref={register()} onChange={checkPrice}/><Input type="radio" name="priceRadio" value="priceNA" ref={register()} onChange={checkPrice}/>Not Applicable <Input type="radio" name="priceRadio" value="priceFree" ref={register()} onChange={checkPrice}/>Free

                    <Label>Add Location</Label>
                    <Input name="location" ref={register()} />
                    <MapContainer>
                        <Map center={position} zoom={13} style={{height:'350px'}}>
                            <TileLayer name="OSM Base Map"
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker draggable={true} onDragend={updateLocation} position={position} />
                        </Map>
                    </MapContainer>

                    <Label>Your Contact Email<SubLabel> - This will not be published</SubLabel></Label>
                    <Input type="email" name="price" ref={register()} />

                    {/*TODO: Captcha*/}

                    {/*TODO: Terms of Service */}
                
                    <BigGreyButton type="submit">Submit</BigGreyButton>
                </form>
            </div>)
}

export default PostCreate
