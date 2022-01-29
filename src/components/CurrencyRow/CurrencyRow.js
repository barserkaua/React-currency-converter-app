import React from 'react';
import {Form, ListGroup, ListGroupItem} from "react-bootstrap";
import './currency-row.css';

export default function CurrencyRow(props) {

  const {
      currencyOptions,
      selectedCurrency,
      onChangeCurrency,
      onChangeAmount,
      amount
  } = props;

  return (
      <div>
          <div>
              <ListGroup horizontal>
                  <ListGroupItem>
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
                  </ListGroupItem>
              </ListGroup>
          </div>
      </div>

  );
}
