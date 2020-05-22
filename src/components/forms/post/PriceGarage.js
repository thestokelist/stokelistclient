import React, { useState, Fragment } from 'react'
import styled from 'styled-components'

import {
    Input,
    InputContainer,
    Label,
    RadioInput,
    RadioText,
    FormError,
} from '../../shared/Forms'
import { FlexRow } from '../../shared/Layouts'
import GarageDate from './GarageDate'

const PrefixInput = styled(Input)`
    border-radius: 0px 5px 5px 0px;
    margin-bottom: 0;
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
    const [isGarageSale, setIsGarageSale] = useState(false)

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
            setValue('priceRadio', null)
        }
        //Handle displaying/hiding garage sale component
        if (e.target.value === 'priceGarage') {
            setIsGarageSale(true)
        } else {
            setIsGarageSale(false)
        }
    }

    return (
        <Fragment>
            <InputContainer>
                <Label>Add a Price</Label>
                <FlexRow>
                    <Prefix>$</Prefix>
                    <PrefixInput
                        type="numeric"
                        name="price"
                        ref={register({ validate: validatePrice })}
                        onChange={updatePriceForm}
                    />
                    <RadioInput
                        type="radio"
                        name="priceRadio"
                        value="priceNA"
                        ref={register()}
                        onChange={updatePriceForm}
                    />
                    <RadioText>Not Applicable</RadioText>
                    <RadioInput
                        type="radio"
                        name="priceRadio"
                        value="priceFree"
                        ref={register()}
                        onChange={updatePriceForm}
                    />
                    <RadioText>Free</RadioText>
                    <RadioInput
                        type="radio"
                        name="priceRadio"
                        value="priceGarage"
                        ref={register()}
                        onChange={updatePriceForm}
                    />
                    <RadioText>Garage Sale</RadioText>
                </FlexRow>

                <FormError>
                    {errors.price && 'Enter a price or select an option'}
                </FormError>
            </InputContainer>
            {isGarageSale && <GarageDate errors={errors} register={register} />}
        </Fragment>
    )
}

export default PostPrice
