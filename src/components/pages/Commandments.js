import React, { Fragment } from 'react'
import { Title } from '../shared/Text'
import { Link } from 'react-router-dom'

function Commandments() {
    return (
        <Fragment>
            <Title>Stoke List Commandments</Title>
            <Link to="/garage">Garage Sale Map</Link>
        </Fragment>
    )
}

export default Commandments
