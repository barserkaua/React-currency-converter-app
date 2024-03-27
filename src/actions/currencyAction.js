import axios from "axios";
import {
    CURRENCY_LIST_REQUEST,
    CURRENCY_LIST_SUCCESS,
    CURRENCY_LIST_FAIL,

    CURRENT_EXCHANGER_REQUEST,
    CURRENT_EXCHANGER_SUCCESS,
    CURRENT_EXCHANGER_FAIL,

} from '../constants/currencyConstants';

export const currencyList = (url) => async (dispatch) => {
    try {
        dispatch({type: CURRENCY_LIST_REQUEST})

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const {data} = await axios.get(
            url,
            config
        )
        
        dispatch({
            type: CURRENCY_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CURRENCY_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const currencyCurrentExchanger = (selected) => async (dispatch, getState) => {
    try {
        dispatch({type: CURRENT_EXCHANGER_REQUEST})

        dispatch({
            type: CURRENT_EXCHANGER_SUCCESS,
            payload: selected
        })

    } catch (error) {
        dispatch({
            type: CURRENT_EXCHANGER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    // we save our cart history in localStorage
    localStorage.setItem('currentExchanger', JSON.stringify(getState().exchanger.currentExchanger))
}