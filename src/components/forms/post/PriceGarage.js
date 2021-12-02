import React, { Fragment } from 'react'
import styled from 'styled-components'

import GarageDate from './GarageDate'

const InputRadioContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const Prefix = styled.div`
    display: flex;
    color: #0000009a;
    height: 32px;
    width: 20px;
    align-items: center;
    justify-content: center;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 1px 1px 5px #0000001a;
    border: 1px solid #dce2e8;
    border-right: none;
    border-radius: 5px 0px 0px 5px;
`

function PostPrice({ errors, register, watch, setValue }) {
    const isGarageSale = watch('priceRadio') === 'priceGarage'

    const validatePrice = () => {
        const price = watch('price')
        const priceRadio = watch('priceRadio')
        //Validation fails if there is no price entered, nor a radio button selected
        return !(price === '' && priceRadio === '')
    }

    const updatePriceForm = (e) => {
        if (e.target.checked) {
            //A price radio box was checked, so clear price text field
            setValue('price', '')
        } else {
            //Text was entered, so clear both price radio boxes
            setValue('priceRadio', '')
        }
    }

    return (
        <Fragment>
            <div className="form-input-container">
                <div className="form-label">Add a Price</div>
                <InputRadioContainer>
                    <div className="flexed-row">
                        <Prefix>$</Prefix>
                        <input
                            className="form-input mb-0 rounded"
                            type="numeric"
                            name="price"
                            ref={register({ validate: validatePrice })}
                            onChange={updatePriceForm}
                        />
                    </div>
                    <div className="flexed-row">
                        <input
                            type="radio"
                            name="priceRadio"
                            value="priceNA"
                            ref={register()}
                            onChange={updatePriceForm}
                        />
                        <span text="form-radio-text">Not Applicable</span>
                        <input
                            type="radio"
                            name="priceRadio"
                            value="priceFree"
                            ref={register()}
                            onChange={updatePriceForm}
                        />
                        <span text="form-radio-text">Free</span>
                        <input
                            type="radio"
                            name="priceRadio"
                            value="priceGarage"
                            ref={register()}
                            onChange={updatePriceForm}
                        />
                        <span text="form-radio-text">Garage Sale</span>
                    </div>
                </InputRadioContainer>

                <div className="form-error">
                    {errors.price && 'Enter a price or select an option'}
                </div>
            </div>
            {isGarageSale && (
                <GarageDate
                    errors={errors}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                />
            )}
        </Fragment>
    )
}

export default PostPrice
