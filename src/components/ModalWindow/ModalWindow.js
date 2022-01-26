import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Form } from 'react-bootstrap';
import './modal-window.scss';
import {currencyCurrentExchanger} from "../../actions/currencyAction";

export default function ModalWindow(props) {

    const {
        currentExchanger,
        currencyOptions
    } = props;

    const dispatch = useDispatch();



    function closeModalWindow() {
        const modal = document.querySelector('.modal');

        modal.classList.add('hide');
        modal.classList.remove('show');
    }

    useEffect(() => {
        const modal = document.querySelector('.modal');

        if (currentExchanger.length === 0) {
            modal.classList.add('show');
        }
    },[])

    function changeCurrentCurrencyHandler(e) {
        dispatch(currencyCurrentExchanger(e.target.value))
        closeModalWindow();
    }

    return (
        <div className="modal">
            <div className="modal__dialog">
                <div className="modal__content">
                    <Form>
                        <Form.Label className="modal__title">
                            Hello User! I'm glad you visited our site, please choose the currency you use:
                        </Form.Label>
                        <Form.Select size="md" className="current-selector my-2" onChange={changeCurrentCurrencyHandler}>
                            {currencyOptions.map((option => (
                                <option key={option}>{option[0]}</option>
                            )))}
                        </Form.Select>
                    </Form>
                </div>
            </div>
        </div>
    )
}
