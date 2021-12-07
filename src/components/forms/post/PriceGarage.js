import React, { Fragment } from 'react'

import GarageDate from './GarageDate'

function PostPrice({ errors, register, watch, setValue }) {
    const isGarageSale = watch('priceRadio') === 'priceGarage'

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
                <div className="flex flex-wrap">
                    <div className="flexed-row">
                        <div className="flex items-center justify-center bg-white shadow gray-border border-r-0 px-1 h-8 rounded">$</div>
                        <input
                            className="form-input mb-0 rounded"
                            type="numeric"
                            name="price"
                            ref={register()}
                            onChange={updatePriceForm}
                        />
                    </div>
                    <div className="flexed-row">
                        <input
                            className="hidden"
                            type="radio"
                            name="priceRadio"
                            value="priceGarage"
                            ref={register()}
                            onChange={updatePriceForm}
                        />
                        <span className="hidden form-radio-text">Garage Sale</span>
                    </div>
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
