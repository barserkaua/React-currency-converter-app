import {
    CURRENCY_LIST_REQUEST,
    CURRENCY_LIST_SUCCESS,
    CURRENCY_LIST_FAIL,

    CURRENT_EXCHANGER_REQUEST,
    CURRENT_EXCHANGER_SUCCESS,
    CURRENT_EXCHANGER_FAIL,
} from '../constants/currencyConstants';


export const currencyListReducer = (state = { currency: {}}, action) => {
    switch (action.type) {
        case CURRENCY_LIST_REQUEST:
            return {loading:true}

        case CURRENCY_LIST_SUCCESS:
            return {loading:false, success: true, currency: action.payload}

        case CURRENCY_LIST_FAIL:
            return {loading:false, error: action.payload}

        default:
            return state
    }
}

export const currentExchangerReducer = (state = { currentExchanger: []}, action) => {
    switch (action.type) {
        case CURRENT_EXCHANGER_REQUEST:
            return {loading:true}

        case CURRENT_EXCHANGER_SUCCESS:
            return {loading:false, success: true, currentExchanger: action.payload}

        case CURRENT_EXCHANGER_FAIL:
            return {loading:false, error: action.payload}

        default:
            return state
    }
}