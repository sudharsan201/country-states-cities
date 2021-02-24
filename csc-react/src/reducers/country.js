import {SET_COUNTRY, UPDATE_COUNTRY} from '../actions/types';

const initialState = {
    country_list: [],
    country_id: 0
};

export default function (state = initialState, action) {
    if (state === undefined) {
        state = initialState;
    }
    const {type, payload} = action;
    switch (type) {
        case SET_COUNTRY:
            return {
                ...state,
                country_id: payload
            }
        case UPDATE_COUNTRY:

            return {
                ...state,
                country_list: payload
            }
        default:
            return state
    }
}

