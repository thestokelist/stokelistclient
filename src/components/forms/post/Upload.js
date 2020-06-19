import React from 'react'
import styled from 'styled-components'
import ImageUploader from 'react-images-upload'

import { Label, InputContainer, SubLabel } from '../../shared/Forms'

const UploadContainer = styled.div`
    width: 20%;
`
function Upload({ errors, register, watch }) {
    const dropHandler = async (file) => {
        console.log(file)
        const formData = new FormData()
        formData.append('media', file[0])

        const response = await fetch('http://localhost:3010/upload', {
            method: 'POST',
            body: formData,
        })
        const media = await response.json()
        console.log(media)
    }
    return (
        <InputContainer>
            <Label>
                Add Images <i>optional</i>
                <SubLabel> - You can add up to 10 Images</SubLabel>
            </Label>
            <UploadContainer>
                <ImageUploader
                    withIcon={true}
                    buttonText="Click to Upload"
                    onChange={dropHandler}
                    imgExtension={['.jpg', '.gif', '.png']}
                    maxFileSize={5242880}
                    singleImage={true}
                />
            </UploadContainer>
        </InputContainer>
    )
}

export default Upload
