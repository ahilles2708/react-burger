import { checkResponse } from '../../utils/utils';
import { baseUrl } from '../../utils/constants';

export const GET_INGREDIENTS_DATA = 'GET_INGREDIENTS_DATA';
export const GET_INGREDIENTS_DATA_FAILED = 'GET_INGREDIENTS_DATA_FAILED';
export const GET_INGREDIENTS_DATA_SUCCESS = 'GET_INGREDIENTS_DATA_SUCCESS';

const requestURL = `${baseUrl}/ingredients`;

export function getIngredientsData() {
    return function(dispatch){
        dispatch({
            type: GET_INGREDIENTS_DATA
        })
        fetch(requestURL)
            .then(checkResponse)
            .then(res => {
                dispatch({
                    type: GET_INGREDIENTS_DATA_SUCCESS,
                    data: res.data
                })
            })
            .catch(
                err => {
                    dispatch({
                        type: GET_INGREDIENTS_DATA_FAILED
                    })
                }
            )
    }
}