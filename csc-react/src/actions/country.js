import { UPDATE_COUNTRY, SET_COUNTRY } from './types';

export const update_country = ( data ) =>dispatch => {

    dispatch({
        type: UPDATE_COUNTRY,
        payload: data
    });
}
export const set_country = (data) => dispatch => {
    dispatch({
        type: SET_COUNTRY,
        payload: data
    })
}