import React from 'react'
import { FaRegTimesCircle, FaCheck } from 'react-icons/fa'
import { Controller } from 'react-hook-form'

function Media({ media, index, deleteMedia, control }) {
    const indexText = `Image #${index + 1}${
        index === 0 ? ' (this will be your main image)' : ''
    }`

    return (
        <div className="form-input-container">
            <div className="flex flex-row w-4/5 bg-white shadow gray-border rounded bg-opacity-100">
                <div className="flex w-1/4 max-w-1/4 items-center justify-center max-h-40">
                    <img
                        className="max-h-full max-w-full contained"
                        src={media.thumbLink}
                        alt="uploaded"
                    />
                </div>
                <div className="p-4 flex-grow">
                    <div className="mb-2 font-medium text-slate">
                        Add Description - {indexText}
                    </div>
                    <Controller
                        as={<input className="form-input w-full" />}
                        name={`media[${index}].name`}
                        control={control}
                        type="text"
                        placeholder="Image Name"
                        defaultValue=""
                    />
                    <div className="text-sm my-2 text-slate font-light">
                        Uploaded! <FaCheck size={20} color={'#175E88'} />
                    </div>
                </div>
                <div className="w-1/12 flex flex-row-reverse p-4">
                    <FaRegTimesCircle size={20} onClick={deleteMedia} />
                </div>
            </div>
            <Controller
                as={<input className="form-input" />}
                name={`media[${index}].guid`}
                control={control}
                type="hidden"
                defaultValue={media.guid || ''}
            />
            <Controller
                as={<input className="form-input" />}
                name={`media[${index}].link`}
                control={control}
                type="hidden"
                defaultValue={media.link}
            />
            <Controller
                as={<input className="form-input" />}
                name={`media[${index}].thumbLink`}
                control={control}
                type="hidden"
                defaultValue={media.thumbLink}
            />
            <Controller
                as={<input className="form-input" />}
                name={`media[${index}].id`}
                control={control}
                type="hidden"
                defaultValue={media.id}
            />
        </div>
    )
}

export default Media
