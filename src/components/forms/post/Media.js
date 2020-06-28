import React from 'react'
import styled from 'styled-components'
import { FaRegTimesCircle, FaCheck } from 'react-icons/fa'
import { Controller } from 'react-hook-form'

import { InputContainer, Input } from '../../shared/Forms'

const UploadContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 1px 1px 5px #0000001a;
    border: 1px solid #dce2e8;
    border-radius: 5px;
    opacity: 1;
`

const ImageComponent = styled.div`
    display: flex;
    width: 25%;
    max-width: 25%;
    align-items: center;
    justify-content: center;
    max-height: 10em;
`

const TextComponent = styled.div`
    padding: 1em;
    flex-grow: 1;
`

const Close = styled.div`
    width: 10%;
    display: flex;
    flex-direction: row-reverse;
    padding: 1em;
`
const UploadText = styled.div`
    font-size: 0.9em;
    color: #000000cc;
    font-weight: 500;
    margin-bottom: 0.5em;
`

const SuccessText = styled.div`
    font-size: 0.8em;
    color: #000000cc;
    margin: 0.5em 0;
`

const FullWidthInput = styled(Input)`
    width: 100%;
`

const UploadImg = styled.img`
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
`

function Media({ media, index, deleteMedia, control }) {
    const indexText = `Image #${index + 1}${
        index === 0 ? ' (this will be your main image)' : ''
    }`

    return (
        <InputContainer>
            <UploadContainer>
                <ImageComponent>
                    <UploadImg src={media.link} alt="uploaded" />
                </ImageComponent>
                <TextComponent>
                    <UploadText>Add Description - {indexText}</UploadText>
                    <Controller
                        as={FullWidthInput}
                        name={`media[${index}].name`}
                        control={control}
                        type="text"
                        placeholder="Image Name"
                        defaultValue=""
                    />
                    <SuccessText>
                        Uploaded! <FaCheck size={12} color={'#175E88'} />
                    </SuccessText>
                </TextComponent>
                <Close>
                    <FaRegTimesCircle size={20} onClick={deleteMedia} />
                </Close>
            </UploadContainer>
            <Controller
                as={Input}
                name={`media[${index}].guid`}
                control={control}
                type="hidden"
                defaultValue={media.guid || ''}
            />
            <Controller
                as={Input}
                name={`media[${index}].link`}
                control={control}
                type="hidden"
                defaultValue={media.link}
            />
            <Controller
                as={Input}
                name={`media[${index}].id`}
                control={control}
                type="hidden"
                defaultValue={media.id}
            />
        </InputContainer>
    )
}

export default Media
