import React from 'react'

import { useMountEffect } from '../../../hooks'
import { getDatePortionForInput, getNextSaturday } from '../../../util/datetime'

function GarageDate({ errors, register, watch, setValue }) {
    
    //Initialize form to next saturday at 9am, if no value set in form when the component mounts
    useMountEffect(() => {
        if (!watch('startTime')) {
            const nextSaturday = getDatePortionForInput(getNextSaturday())
            //create start time for next Saturday
            setValue('garageDate', nextSaturday)
            setValue('startTime', '09:00')
        }
    })
    return (
        <div className="form-input-container">
            <div className="form-label">When's it happening?</div>
            From
            <input  
                className="form-input"
                type="time"
                name="startTime"
                ref={register({ required: true })}
            />
            To
            <input
                className="form-input"
                type="time"
                name="endTime"
                ref={register({ required: true })}
            />
            On
            <input
                className="form-input"
                type="date"
                name="garageDate"
                ref={register({ required: true })}
            />
            <div className="form-error">
                {(errors.startTime || errors.endTime || errors.garageDate) &&
                    'Start time, Finish time and date are all required for a garage sale.'}
            </div>
        </div>
    )
}

export default GarageDate
