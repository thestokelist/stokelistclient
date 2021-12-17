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
                    <div className="flexed-row shadow rounded">
                        <div className="text-sm flex items-center justify-center bg-white border border-solid border-gray-300 border-r-0 pl-2 h-8 rounded-l font-light">$</div>
                        <input
                            className="h-8 rounded-r border border-solid border-gray-300 bg-white pl-2 mb-0 border-l-0"
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
