import { UPDATE_STATE, SET_STATE } from './types';

export const update_state = ( data ) =>dispatch => {

    dispatch({
        type: UPDATE_STATE,
        payload: data
    });
}
export const set_state = (data) => dispatch => {
    dispatch({
        type: SET_STATE,
        payload: data
    })
}