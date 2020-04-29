import React from 'react'
import styled from 'styled-components'
import { Map, TileLayer, GeoJSON, Popup } from 'react-leaflet'

import PostSection from '../posts/PostSection'
import PostSummary from '../posts/PostSummary'
import { endpoints } from '../../constants/endpoints'
import { useMountEffect, usePosts } from '../../hooks'
import { HalfWidth } from '../shared/Layouts'

const MapContainer = styled.div`
    height: 350px;
    width: 100%;
`

const FlexContainer = styled.div`
    display: flex;
`

function GarageMap() {
    const [garageSales, loadGarageSales] = usePosts(endpoints.GARAGE)

    useMountEffect(() => {
        loadGarageSales()
    })

    const position = [50.9981, -118.1957]

    return (
        <FlexContainer>
            <HalfWidth>
                <PostSection
                    title="Garage Sale Map"
                    posts={garageSales}
                    hideEmpty={false}
                    style={{ display: 'inline' }}
                />
            </HalfWidth>
            <HalfWidth>
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
                        {garageSales.map((sale) => (
                            <GeoJSON data={sale.exactLocation} key={sale.id}>
                                {' '}
                                <Popup>
                                  <PostSummary post={sale} />
                                </Popup>
                            </GeoJSON>
                        ))}
                    </Map>
                </MapContainer>
            </HalfWidth>
        </FlexContainer>
    )
}

export default GarageMap
