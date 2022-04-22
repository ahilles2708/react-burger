import { checkResponse } from '../../utils/utils';

export const CREATE_NEW_ORDER_REQUEST = 'CREATE_NEW_ORDER_REQUEST';
export const CREATE_NEW_ORDER_FAILED = 'CREATE_NEW_ORDER_FAILED';
export const CREATE_NEW_ORDER_SUCCESS = 'CREATE_NEW_ORDER_SUCCESS';
export const RESET_ORDER = 'RESET_ORDER';

const apiURL = 'https://norma.nomoreparties.space/api/orders';

export function createOrder(data) {
    return function(dispatch){
        dispatch({
            type: CREATE_NEW_ORDER_REQUEST
        })
        fetch(apiURL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result =>{
            if(result && result.success) {
                dispatch({
                    type: CREATE_NEW_ORDER_SUCCESS,
                    data: result.order,
                })
            } else {
                dispatch({
                    type: CREATE_NEW_ORDER_FAILED
                })
            }
        })
    }
}