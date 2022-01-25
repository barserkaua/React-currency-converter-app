import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col, Form } from "react-bootstrap";

import {currencyCurrentExchanger} from "../../actions/currencyAction";

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
                        <Form.Select size="md" className="text-center" onChange={changeCurrentCurrencyHandler} value={currentExchanger}>
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
                                    {currencyOptions.map(currentValue => {
                                        if (currentValue[0] === currentExchanger) {
                                            return (
                                                <td key={currentValue}>{(option[1]/currentValue[1]).toFixed(4)}</td>
                                            )
                                        }
                                    })}
                                    <td >{option[0]}</td>
                                </tr>
                            </tbody>
                        )))}
                    </Table>
                </Col>
            </Row>
        </div>
    )
}