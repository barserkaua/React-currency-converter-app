import {
    LATEST_NEWS_LIST_REQUEST,
    LATEST_NEWS_LIST_SUCCESS,
    LATEST_NEWS_LIST_FAIL,
} from "../constants/newsConstants";

export const latestNewsListReducer = (state = { latestNews: {}}, action) => {
    switch (action.type) {
        case LATEST_NEWS_LIST_REQUEST:
            return {loading:true, success: false}

        case LATEST_NEWS_LIST_SUCCESS:
            return {loading:false, success: true, latestNews: action.payload}

        case LATEST_NEWS_LIST_FAIL:
            return {loading:false, error: action.payload}

        default:
            return state
    }
}