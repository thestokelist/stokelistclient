import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Map, TileLayer, Marker } from 'react-leaflet'
import {
    Input,
    InputContainer,
    Label,
    HalfWidthInput,
    RadioInput,
    RadioText,
} from '../../shared/Forms'
import { FlexRow } from '../../shared/Layouts'

const MapContainer = styled.div`
    height: 350px;
    width: 60%;
    margin: 1em 0;
`

function LocationMap({ setValue, register, watch }) {
    const hasLocation = watch('lat') && watch('lng')

    let startPosition = [50.9981, -118.1957]
    const position = hasLocation ? [watch('lat'), watch('lng')] : startPosition

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

    const handleLocationCheckbox = (e) => {
        if (e.target.checked) {
            setValue('lat', startPosition[0])
            setValue('lng', startPosition[1])
        } else {
            setValue('lat', null)
            setValue('lng', null)
        }
    }

    return (
        <Fragment>
            <InputContainer>
                <Label>Add Location</Label>
                <FlexRow>
                    <HalfWidthInput
                        name="location"
                        ref={register}
                        placeholder="Where you at?"
                    />
                    {/*Component intentially not registered - just provides some page logic, the hidden fields capture the input data */}
                    <RadioInput
                        type="checkbox"
                        name="exactLocation"
                        checked={hasLocation}
                        onClick={handleLocationCheckbox}
                    />
                    <RadioText>Set Exact Location</RadioText>
                </FlexRow>
            </InputContainer>
            {hasLocation && (
                <MapContainer>
                    <Map
                        center={position}
                        zoom={13}
                        style={{ height: '350px' }}
                    >
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
            )}
            <Input type="hidden" name="lat" ref={register} />
            <Input type="hidden" name="lng" ref={register} />
        </Fragment>
    )
}

export default LocationMap
