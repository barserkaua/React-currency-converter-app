import React, {useEffect} from 'react';
import { Table, Row, Col, Form, ListGroup } from "react-bootstrap";
import './currency-row.css';

export default function CurrencyRow(props) {

  const {
      currencyOptions,
      selectedCurrency,
      onChangeCurrency,
      onChangeAmount,
      switchCurrency,
      amount
  } = props;

  return (
      <div>
          <div>
              <ListGroup horizontal>
                  <Form.Control
                      type="number"
                      value={amount} onChange={onChangeAmount}
                      className="bootstrap-input"
                  />

                  <Form.Select value={selectedCurrency} onChange={onChangeCurrency}>
                      {currencyOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                      ))}
                  </Form.Select>
              </ListGroup>
          </div>
      </div>

  );
}
