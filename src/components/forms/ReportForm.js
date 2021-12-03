import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { endpoints } from '../../constants/endpoints'
import { useNetworkRequest } from '../../hooks'

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
                <span className="form-radio-text">Slander</span>
            </div>
            <div className="flexed-row">
                <input
                    type="radio"
                    name="reason"
                    value="Scam"
                    ref={register()}
                />
                <span className="form-radio-text">Scam</span>
            </div>
            <div className="flexed-row">
                <input
                    type="radio"
                    name="reason"
                    value="Defamation"
                    ref={register()}
                />
                <span className="form-radio-text">Defamation</span>
            </div>
            <div className="flexed-row">
                <input
                    type="radio"
                    name="reason"
                    value="Xenophobia"
                    ref={register()}
                />
                <span className="form-radio-text">Xenophobia</span>
            </div>
            <div className="flexed-row">
                <input
                    type="radio"
                    name="reason"
                    value="Crime"
                    ref={register()}
                />
                <span className="form-radio-text">Incites Crime or Threats</span>
            </div>
            <div className="flexed-row">
                <input
                    type="radio"
                    name="reason"
                    value="Rude"
                    //With react-hook-form/required radio buttons, register the last one as required
                    ref={register({ required: true })}
                />
                <span className="form-radio-text">Profanity or Obsenity</span>
            </div>
            <div className="form-error">
                {errors.reason &&
                    errors.reason.type === 'required' &&
                    'You must give a reason'}
            </div>
            <div className="form-input-container">
                <div className="form-label">Comment</div>
                <textarea className="w-3/5" name="comment" ref={register()} />
            </div>

            <div className="flexed-row justify-between w-20">
                <button className="btn-white" type="button" onClick={doCancel}>
                    Cancel
                </button>
                <button className="btn-white-red" type="submit">Report Post</button>
            </div>
        </form>
    )
}

export default ReportForm
