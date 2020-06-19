import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { Map, TileLayer, GeoJSON, Popup, Tooltip } from 'react-leaflet'
import L from 'leaflet'

import PostSection from '../posts/PostSection'
import PostSummary from '../posts/PostSummary'
import { endpoints } from '../../constants/endpoints'
import { useMountEffect, usePosts } from '../../hooks'
import { Label, Input } from '../shared/Forms'
import { sameDate } from '../../util/datetime'

const MapContainer = styled.div`
    height: 350px;
    width: 100%;
`

function GarageMap() {
    const [garageSales, loadGarageSales] = usePosts(endpoints.GARAGE)
    const [filteredSales,setFilteredSales] = useState(null)

    useMountEffect(() => {
        loadGarageSales()
    })

    const position = [50.9981, -118.1957]


    const filterSales = e => {
        //get date from event
        const filterDate = e.target.value
        if (filterDate === '') {
            setFilteredSales(null)
        } else {
            const filter = sameDate(filterDate)
            //filter only those dates
            const filteredSalesByDate = garageSales.filter(x => filter(x.startTime))
            setFilteredSales(filteredSalesByDate)
        }
    }

    const currentSales = filteredSales || garageSales

    return (
        <Fragment>
            <PostSection
                title="Garage Sale Map"
                posts={currentSales}
                hideEmpty={false}
                style={{ display: 'inline' }}
                hideDates={true}
                numbered={true}
                titleButton={
                    <Fragment>
                        <div>
                            <Label>Select Date</Label>
                            <Input type="date" name="garageDate" onChange={filterSales}/>
                        </div>
                    </Fragment>
                }
            />
            <MapContainer>
                <Map center={position} zoom={13} style={{ height: '350px' }}>
                    <TileLayer
                        name="OSM Base Map"
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {currentSales.map((sale, index) => (
                        sale.exactLocation != null ? 
                        <GeoJSON
                            data={sale.exactLocation}
                            key={sale.id}
                            pointToLayer={(_, latlng) =>
                                L.circleMarker(latlng, {
                                    color: '#175e88',
                                    radius: '18',
                                    fillColor: 'white',
                                    fillOpacity: 0.5,
                                })
                            }
                        >
                            <Tooltip direction="center" permanent>
                                {index + 1}
                            </Tooltip>
                            <Popup>
                                <PostSummary post={sale} />
                            </Popup>
                        </GeoJSON> : null
                    ))}
                </Map>
            </MapContainer>
        </Fragment>
    )
}

export default GarageMap
