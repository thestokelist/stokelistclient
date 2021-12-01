import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import {
    RadioInput,
    RadioText,
    InputContainer,
    Label,
    FormError,
} from '../shared/Forms'
import { WhiteBlueButton, WhiteRedButton } from '../shared/Buttons'
import { endpoints } from '../../constants/endpoints'
import { useNetworkRequest } from '../../hooks'

const Comment = styled.textarea`
    width: 60%;
`

function ReportForm({ id }) {
    const { register, handleSubmit, errors } = useForm()
    const history = useHistory()
    const { apiPost } = useNetworkRequest()

    const onSubmit = async (data) => {
        const postData = { reason: data.reason, comment: data.comment }
        const response = await apiPost(
            `${endpoints.REPORT}${id}`,
            postData
        )
        if (response) {
            history.push('/reported')
        }
    }

    const doCancel = () => {
        history.goBack()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flexed-row">
                <RadioInput
                    type="radio"
                    name="reason"
                    value="Slander"
                    ref={register()}
                />
                <RadioText>Slander</RadioText>
            </div>
            <div className="flexed-row">
                <RadioInput
                    type="radio"
                    name="reason"
                    value="Scam"
                    ref={register()}
                />
                <RadioText>Scam</RadioText>
            </div>
            <div className="flexed-row">
                <RadioInput
                    type="radio"
                    name="reason"
                    value="Defamation"
                    ref={register()}
                />
                <RadioText>Defamation</RadioText>
            </div>
            <div className="flexed-row">
                <RadioInput
                    type="radio"
                    name="reason"
                    value="Xenophobia"
                    ref={register()}
                />
                <RadioText>Xenophobia</RadioText>
            </div>
            <div className="flexed-row">
                <RadioInput
                    type="radio"
                    name="reason"
                    value="Crime"
                    ref={register()}
                />
                <RadioText>Incites Crime or Threats</RadioText>
            </div>
            <div className="flexed-row">
                <RadioInput
                    type="radio"
                    name="reason"
                    value="Rude"
                    //With react-hook-form/required radio buttons, register the last one as required
                    ref={register({ required: true })}
                />
                <RadioText>Profanity or Obsenity</RadioText>
            </div>
            <FormError>
                {errors.reason &&
                    errors.reason.type === 'required' &&
                    'You must give a reason'}
            </FormError>
            <InputContainer>
                <Label>Comment</Label>
                <Comment name="comment" ref={register()} />
            </InputContainer>

            <div className="flexed-row justify-between w-20">
                <WhiteBlueButton type="button" onClick={doCancel}>
                    Cancel
                </WhiteBlueButton>
                <WhiteRedButton type="submit">Report Post</WhiteRedButton>
            </div>
        </form>
    )
}

export default ReportForm
