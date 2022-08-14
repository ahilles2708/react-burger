import { checkResponse } from '../../utils/utils';
import { baseUrl } from '../../utils/constants';
import { getCookie } from '../../utils/utils';

import {
    CREATE_NEW_ORDER_REQUEST,
    CREATE_NEW_ORDER_FAILED,
    CREATE_NEW_ORDER_SUCCESS,
    RESET_ORDER,
} from "../constants/order";
import { AppDispatch } from '../types';
import { IOrderNewData, TCreateOrder } from '../../types';

export interface ICreateNewOrderRequest {
    readonly type: typeof CREATE_NEW_ORDER_REQUEST;
}
export interface ICreateNewOrderFailed {
    readonly type: typeof CREATE_NEW_ORDER_FAILED;
}
export interface ICreateNewOrderSuccess {
    readonly type: typeof CREATE_NEW_ORDER_SUCCESS;
    readonly data: IOrderNewData;
}
export interface IOrderReset {
    readonly type: typeof RESET_ORDER;
}

const requestURL = `${baseUrl}/orders`;

export function createOrder(data: TCreateOrder) {
    return function(dispatch: AppDispatch){
        dispatch({
            type: CREATE_NEW_ORDER_REQUEST
        })
        fetch(requestURL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + getCookie("accessToken"),
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

export type TCreateOrderActions =
    | ICreateNewOrderRequest
    | ICreateNewOrderFailed
    | ICreateNewOrderSuccess
    | IOrderReset;