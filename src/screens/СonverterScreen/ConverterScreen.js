import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './convert-screen.scss';
import {currencyList} from "../../actions/currencyAction";

export const BASE_URL = 'https://api.exchangerate.host/latest';

const CurrencyRow = React.lazy(() => import('../../components/CurrencyRow/CurrencyRow'));


export default function ConverterScreen() {

    const dispatch = useDispatch();

    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [exchangeRate, setExchangeRate] = useState();
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    const listOfCurrency = useSelector(state => state.listOfCurrency);
    const { success, currency } = listOfCurrency;

    const exchanger = useSelector(state => state.exchanger);
    const {currentExchanger} = exchanger;

    let toAmount, fromAmount
    if (amountInFromCurrency) {
        fromAmount = amount
        toAmount = amount * exchangeRate
    } else {
        toAmount = amount
        fromAmount = amount / exchangeRate
    }

    useEffect(() => {
        dispatch(currencyList(BASE_URL))
    }, [dispatch])

    useEffect(() => {
        if (success) {
            setCurrencyOptions([...Object.keys(currency.rates)])
            setFromCurrency(currency.base)
            setToCurrency(currentExchanger)
            setExchangeRate(currency.rates[currentExchanger])
        }
    },[currency])

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`)
                .then(res => res.json())
                .then(data => setExchangeRate(data.result))
        }

    }, [toCurrency, fromCurrency])

    function handleFromAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }

    function handleToAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }

    return (
        <div className='convert__screen '>
            <Suspense fallback={<div>Download...</div>}>
                <h2 className='convert__screen__text'>Convert</h2>
                <CurrencyRow
                    currencyOptions={currencyOptions}
                    selectedCurrency={fromCurrency}
                    onChangeCurrency={e => setFromCurrency(e.target.value)}
                    onChangeAmount={handleFromAmountChange}
                    amount={fromAmount}
                />
                <span className='equals'>=</span>
                <CurrencyRow
                    currencyOptions={currencyOptions}
                    selectedCurrency={toCurrency}
                    onChangeCurrency={e => setToCurrency(e.target.value)}
                    onChangeAmount={handleToAmountChange}
                    amount={toAmount}
                />
            </Suspense>
        </div>
  );
}
