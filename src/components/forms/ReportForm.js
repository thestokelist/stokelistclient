import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

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
                <input
                    type="radio"
                    name="reason"
                    value="Slander"
                    ref={register()}
                />
                <span text="form-radio-text">Slander</span>
            </div>
            <div className="flexed-row">
                <input
                    type="radio"
                    name="reason"
                    value="Scam"
                    ref={register()}
                />
                <span text="form-radio-text">Scam</span>
            </div>
            <div className="flexed-row">
                <input
                    type="radio"
                    name="reason"
                    value="Defamation"
                    ref={register()}
                />
                <span text="form-radio-text">Defamation</span>
            </div>
            <div className="flexed-row">
                <input
                    type="radio"
                    name="reason"
                    value="Xenophobia"
                    ref={register()}
                />
                <span text="form-radio-text">Xenophobia</span>
            </div>
            <div className="flexed-row">
                <input
                    type="radio"
                    name="reason"
                    value="Crime"
                    ref={register()}
                />
                <span text="form-radio-text">Incites Crime or Threats</span>
            </div>
            <div className="flexed-row">
                <input
                    type="radio"
                    name="reason"
                    value="Rude"
                    //With react-hook-form/required radio buttons, register the last one as required
                    ref={register({ required: true })}
                />
                <span text="form-radio-text">Profanity or Obsenity</span>
            </div>
            <div className="form-error">
                {errors.reason &&
                    errors.reason.type === 'required' &&
                    'You must give a reason'}
            </div>
            <div className="form-input-container">
                <div className="form-label">Comment</div>
                <Comment name="comment" ref={register()} />
            </div>

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
