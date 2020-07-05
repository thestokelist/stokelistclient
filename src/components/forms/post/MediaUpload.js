import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { FaRegTimesCircle, FaUpload } from 'react-icons/fa'

import { InputContainer } from '../../shared/Forms'
import Loading from '../../shared/Loading'

const UploadContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 1px 1px 5px #0000001a;
    border: 1px solid #dce2e8;
    border-radius: 5px;
    opacity: 1;
    justify-content: space-between;
`

const UploadComponent = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    height: 10em;

`

const FileUploadBox = styled.div`
    display: flex;
    flex-grow: 1;
    height: 100%;
    flex-direction:column;
    align-items: center;
    justify-content: center;
`

const Close = styled.div`
    padding: 1em;
`

function Media({ addMedia, index, close }) {
    const [loading, setLoading] = useState(false)

    const onDrop = useCallback(
        (acceptedFiles) => {
            const uploadFile = async (acceptedFiles) => {
                setLoading(true)
                const formData = new FormData()
                formData.append('media', acceptedFiles[0])
                //Upload the actual file
                const response = await fetch('http://localhost:3010/upload', {
                    method: 'POST',
                    body: formData,
                })
                const media = await response.json()
                addMedia(media)
                setLoading(false)
            }
            uploadFile(acceptedFiles)
        },
        [addMedia]
    )
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    })

    return (
        <InputContainer>
            <UploadContainer>
                <UploadComponent>
                    {loading ? (
                        <Loading />
                    ) : (
                        <FileUploadBox {...getRootProps()}>
                            <div><FaUpload size={30} /></div>
                            <input {...getInputProps({multiple: false})} />
                            {isDragActive ? (
                                <p>Drop the files here ...</p>
                            ) : (
                                <p>
                                    Click or Drag to Upload
                                </p>
                            )}
                        </FileUploadBox>
                    )}
                </UploadComponent>
                <Close>
                    <FaRegTimesCircle size={20} onClick={close} />
                </Close>
            </UploadContainer>
        </InputContainer>
    )
}

export default Media
