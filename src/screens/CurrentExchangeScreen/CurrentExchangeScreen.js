import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { currencyList } from '../../actions/currencyAction';
import {BASE_URL} from "../СonverterScreen/ConverterScreen";

const CurrencyTable = React.lazy(() => import("../../components/CurrencyTable/CurrencyTable"));

export default function CurrentExchangeScreen() {

    const dispatch = useDispatch();

    const [currencyOptions, setCurrencyOptions] = useState([]);

    const listOfCurrency = useSelector(state => state.listOfCurrency);
    const { success, currency } = listOfCurrency;

    useEffect(() => {
        if (success) {
            setCurrencyOptions([...Object.entries(currency.data)])
        }
    },[currency])

    useEffect(() => {
        dispatch(currencyList(BASE_URL))
    }, [dispatch])

    return (
        <div>
            <Suspense fallback={<div>Download...</div>}>
                <h2 className='convert__screen__text text-center'>Currency Exchange</h2>
                <CurrencyTable
                    currencyOptions={currencyOptions}
                />
            </Suspense>
        </div>
    )
}