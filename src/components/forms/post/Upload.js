import React, { useState, Fragment } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { useFieldArray } from 'react-hook-form'

import { Label, SubLabel, InputContainer, FormError } from '../../shared/Forms'
import Media from './Media'
import MediaUpload from './MediaUpload'

function Upload({ errors, register, control }) {
    const [active, setActive] = useState(false)

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'media',
        keyName: "id",
    })
    const attachmentSpace = fields.length < 10

    return (
        <Fragment>
            <Label>
                Add Images <i>(optional)</i>
                <SubLabel> - You can add up to 10 Images</SubLabel>
            </Label>
            <FormError>
                {errors.media && 'Something went wrong with your uploads'}
            </FormError>
            {fields.map((m, i) => (
                /* Important: Key must match the id defined in useFieldArray */
                <div key={m.id}>
                <Media
                    media={m}
                    index={i}
                    deleteMedia={() => remove(i)}
                    control={control}
                />
                </div>

            ))}
            {active ? (
                attachmentSpace && <MediaUpload
                    addMedia={append}
                    index={fields.length}
                    close={() => setActive(false)}
                />
            ) : (
                attachmentSpace && <InputContainer onClick={() => setActive(true)}>
                    <FaPlusCircle size={20} color={'#175E88'} />
                    <SubLabel>Upload an Image</SubLabel>
                </InputContainer>
            )}
        </Fragment>
    )
}

export default Upload
