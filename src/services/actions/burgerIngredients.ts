import { checkResponse } from '../../utils/utils';
import { baseUrl } from '../../utils/constants';

import {
    GET_INGREDIENTS_DATA,
    GET_INGREDIENTS_DATA_FAILED,
    GET_INGREDIENTS_DATA_SUCCESS,
} from "../constants/burgerIngredients";
import { AppDispatch } from '../types';
import { IItemProps } from '../../types';

export interface IGetIngredientsData {
    readonly type: typeof GET_INGREDIENTS_DATA;
}
export interface IGetIngredientsDataFailed {
    readonly type: typeof GET_INGREDIENTS_DATA_FAILED;
}
export interface IGetIngredientsDataSuccess {
    readonly type: typeof GET_INGREDIENTS_DATA_SUCCESS;
    readonly data: IItemProps[];
}

const requestURL = `${baseUrl}/ingredients`;

export function getIngredientsData() {
    return function(dispatch: AppDispatch){
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

export type TIngredientsDataActions = 
    | IGetIngredientsData
    | IGetIngredientsDataFailed
    | IGetIngredientsDataSuccess;