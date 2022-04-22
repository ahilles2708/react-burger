import { checkResponse } from '../../utils/utils';

export const GET_INGREDIENTS_DATA = 'GET_INGREDIENTS_DATA';
export const GET_INGREDIENTS_DATA_FAILED = 'GET_INGREDIENTS_DATA_FAILED';
export const GET_INGREDIENTS_DATA_SUCCESS = 'GET_INGREDIENTS_DATA_SUCCESS';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

const apiURL = 'https://norma.nomoreparties.space/api/ingredients';

export function getIngredientsData() {
    return function(dispatch){
        dispatch({
            type: GET_INGREDIENTS_DATA
        })
        fetch(apiURL)
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