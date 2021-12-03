import React, { useState, useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaRegTimesCircle, FaUpload } from 'react-icons/fa'

import Loading from '../../shared/Loading'
import { endpoints } from '../../../constants/endpoints'
import { useNetworkRequest } from '../../../hooks'
import { store } from '../../store'

function Media({ addMedia, index, close }) {
    const [loading, setLoading] = useState(false)
    const { authApiMultipartPost } = useNetworkRequest()
    const { state } = useContext(store)

    const onDrop = useCallback(
        (acceptedFiles) => {
            const uploadFile = async (acceptedFiles) => {
                setLoading(true)
                const formData = new FormData()
                formData.append('media', acceptedFiles[0])
                //Upload the actual file
                const response = await authApiMultipartPost(
                    endpoints.UPLOAD,
                    formData,
                    state.token
                )
                const media = await response.json()
                addMedia(media)
                setLoading(false)
            }
            uploadFile(acceptedFiles)
        },
        [addMedia, state.token, authApiMultipartPost]
    )
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    })

    return (
        <div className="form-input-container">
            <div className="flex flex-row w-4/5 bg-white shado gray-border rounded bg-opacity-100 justify-between">
                <div className="flex flex-grow items-center justify-center h-40">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div
                            className="flex flex-grow h-full flex-col items-center justify-center"
                            {...getRootProps()}
                        >
                            <div>
                                <FaUpload size={30} />
                            </div>
                            <input {...getInputProps({ multiple: false })} />
                            {isDragActive ? (
                                <p>Drop the files here ...</p>
                            ) : (
                                <p>Click or Drag to Upload</p>
                            )}
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <FaRegTimesCircle size={20} onClick={close} />
                </div>
            </div>
        </div>
    )
}

export default Media
