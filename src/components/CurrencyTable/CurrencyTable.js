import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col, Form } from "react-bootstrap";
import ModalWindow from "../ModalWindow/ModalWindow";

import {currencyCurrentExchanger} from "../../actions/currencyAction";

import './currency-table.css'

export default function CurrencyTable(props) {

    const {
        currencyOptions,
    } = props;

    const dispatch = useDispatch();

    const exchanger = useSelector(state => state.exchanger);
    const {currentExchanger} = exchanger;

    function changeCurrentCurrencyHandler(e) {
        dispatch(currencyCurrentExchanger(e.target.value))
    }

    useEffect(() => {
        dispatch(currencyCurrentExchanger(currentExchanger))
    }, [currentExchanger])

    return (
        <div>
            <Row className="d-flex justify-content-center">
                <Col md={8}>

                    <Form.Group className="text-center my-3">
                        <Form.Label>
                            <b>Your current currency</b>
                        </Form.Label>
                        <Form.Select
                            size="md"
                            className="current-selector"
                            onChange={changeCurrentCurrencyHandler}
                            value={currentExchanger}
                        >
                            {currencyOptions.map((option => (
                                <option key={option}>{option[0]}</option>
                            )))}
                        </Form.Select>
                    </Form.Group>

                    <Table striped bordered hover responsive="sm"  size="sm" className='text-center'>
                        <thead>
                        <tr>
                            <th>FROM CURRENCY</th>
                            <th>AMOUNT</th>
                            <th>RATE</th>
                            <th>TO CURRENCY</th>
                        </tr>
                        </thead>
                        {currencyOptions.map((option => (
                            <tbody key={option}>
                                <tr>
                                    <td>{currentExchanger}</td>
                                    <td>1</td>
                                    {currencyOptions.map(currentCurrency => (
                                        currentCurrency[0] === currentExchanger &&  <td key={currentCurrency}>{(option[1]/currentCurrency[1]).toFixed(4)}</td>
                                    ))}
                                    <td >{option[0]}</td>
                                </tr>
                            </tbody>
                        )))}
                    </Table>
                    <ModalWindow currencyOptions={currencyOptions} currentExchanger={currentExchanger}/>
                </Col>
            </Row>
        </div>
    )
}