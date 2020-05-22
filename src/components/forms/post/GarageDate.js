import React from 'react'
import {
    Label,
    Input,
    FormError,
    InputContainer
} from '../../shared/Forms'

function GarageDate({ errors, register }) {
    return (
        <InputContainer>
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
            <FormError>
                {(errors.startTime || errors.endTime || errors.garageDate) &&
                    'Start time, Finish time and date are all required for a garage sale.'}
            </FormError>
        </InputContainer>
    )
}

export default GarageDate
