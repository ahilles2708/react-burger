import { checkResponse } from '../../utils/utils';
import { baseUrl } from '../../utils/constants';

export const CREATE_NEW_ORDER_REQUEST = 'CREATE_NEW_ORDER_REQUEST';
export const CREATE_NEW_ORDER_FAILED = 'CREATE_NEW_ORDER_FAILED';
export const CREATE_NEW_ORDER_SUCCESS = 'CREATE_NEW_ORDER_SUCCESS';
export const RESET_ORDER = 'RESET_ORDER';

const requestURL = `${baseUrl}/orders`;

export function createOrder(data) {
    return function(dispatch){
        dispatch({
            type: CREATE_NEW_ORDER_REQUEST
        })
        fetch(requestURL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(checkResponse)
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
        }).catch(
            err => {
                dispatch({
                    type: CREATE_NEW_ORDER_FAILED
                })
            }
        )
    }
}