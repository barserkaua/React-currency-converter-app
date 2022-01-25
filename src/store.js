import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { currencyListReducer, currentExchangerReducer } from "./reducers/currencyReducer";


const reducer = combineReducers({
    // here, we just register our reducers
    listOfCurrency: currencyListReducer,
    exchanger: currentExchangerReducer,
})

const currentCurrencyExchangerFromStorage = localStorage.getItem('currentExchanger') ?
    JSON.parse(localStorage.getItem('currentExchanger')) : []

const initialState = {
    exchanger: {
        currentExchanger: currentCurrencyExchangerFromStorage,
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;
