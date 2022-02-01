import React from 'react'
import { FaRegTimesCircle, FaCheck } from 'react-icons/fa'
import { Controller } from 'react-hook-form'

function Media({ media, index, deleteMedia, control }) {
    const indexText =
        index === 0 ? 'This will be your main image' : `Image #${index + 1}`

    return (
        <div className="form-input-container">
            <div className="flex flex-col lg:flex-row w-full lg:w-4/5 bg-white shadow gray-border rounded bg-opacity-100">
                <div className="ml-auto lg:order-2 pr-4 pt-4">
                    <FaRegTimesCircle size={20} onClick={deleteMedia} />
                </div>
                <div className="flex w-full lg:w-1/4 max-w-full lg:max-w-1/4 items-center justify-center max-h-40 mt-2 lg:mt-0">
                    <img
                        className="max-h-full max-w-full contained rounded"
                        src={media.thumbLink}
                        alt="uploaded"
                    />
                </div>
                <div className="p-4 flex-grow">
                    <div className="mb-2">
                        <div className="font-medium text-slate">
                            Add Description
                            <span className="font-light hidden lg:inline"> - {indexText}</span>
                        </div>
                        <div className="lg:hidden text-slate font-light">
                            {indexText}
                        </div>
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
                    <FaCheck size={20} color={'#175E88'} /> Uploaded! 
                    </div>
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
