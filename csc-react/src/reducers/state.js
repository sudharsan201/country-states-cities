import {SET_STATE, UPDATE_STATE} from '../actions/types';

const initialState = {
    state_list: [],
    state_id: 0
};

export default function (state = initialState, action) {
    if (state === undefined) {
        state = initialState;
    }
    const {type, payload} = action;
    switch (type) {
        case SET_STATE:
            return {
                ...state,
                state_id: payload
            }
        case UPDATE_STATE:

            return {
                ...state,
                state_list: payload
            }
        default:
            return state
    }
}

