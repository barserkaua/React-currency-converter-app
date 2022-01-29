import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import './convert-screen.scss';
import {currencyList} from "../../actions/currencyAction";

export const BASE_URL = 'https://api.exchangerate.host/latest';

const CurrencyRow = React.lazy(() => import('../../components/CurrencyRow/CurrencyRow'));
const PopularNews = React.lazy(() => import('../../components/PopularNews/PopularNews'))

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

    function handleSwitchCurrency() {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }

    return (
        <Row className="convert__screen">
            <Col md={6} className='convert__screen__currency'>
                <Suspense fallback={<div>Download...</div>}>
                    <h2 className='convert__screen__text'>Convert currency</h2>
                    <CurrencyRow
                        currencyOptions={currencyOptions}
                        selectedCurrency={fromCurrency}
                        onChangeCurrency={e => setFromCurrency(e.target.value)}
                        onChangeAmount={handleFromAmountChange}
                        amount={fromAmount}
                    />
                    <span className='switch' onClick={handleSwitchCurrency}><i className="fas fa-exchange-alt"/></span>
                    <CurrencyRow
                        currencyOptions={currencyOptions}
                        selectedCurrency={toCurrency}
                        onChangeCurrency={e => setToCurrency(e.target.value)}
                        onChangeAmount={handleToAmountChange}
                        amount={toAmount}
                    />
                </Suspense>
            </Col>
            <Col md={6} className="convert__screen__news">
                <Suspense fallback={<div>Download...</div>}>
                    <div className="convert__screen__news__promo">Latest News</div>
                    <PopularNews/>
                </Suspense>
            </Col>
        </Row>

  );
}
