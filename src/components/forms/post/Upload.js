import React, { useState, Fragment } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { useFieldArray } from 'react-hook-form'

import Media from './Media'
import MediaUpload from './MediaUpload'

function Upload({ errors, register, control }) {
    const [active, setActive] = useState(false)

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'media',
        keyName: 'id',
    })
    const attachmentSpace = fields.length < 10

    return (
        <Fragment>
            <div className="form-label">
                Add Images <i>(optional)</i>
                <span className="form-sublabel">
                    {' '}
                    - You can add up to 10 Images
                </span>
            </div>
            <div className="form-error">
                {errors.media && 'Something went wrong with your uploads'}
            </div>
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
            {active
                ? attachmentSpace && (
                      <MediaUpload
                          addMedia={append}
                          index={fields.length}
                          close={() => setActive(false)}
                      />
                  )
                : attachmentSpace && (
                      <div
                          className="form-input-container"
                          onClick={() => setActive(true)}
                      >
                          <FaPlusCircle size={20} color={'#175E88'} />
                          <span className="form-sublabel">Upload an Image</span>
                      </div>
                  )}
        </Fragment>
    )
}

export default Upload
