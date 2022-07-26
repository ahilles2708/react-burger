import { IItemProps } from '../../types';
import { TIngredientsDataActions } from '../actions/burgerIngredients';
import {
    GET_INGREDIENTS_DATA,
    GET_INGREDIENTS_DATA_FAILED,
    GET_INGREDIENTS_DATA_SUCCESS,
} from '../constants/burgerIngredients';

export type TIngredientsDataState = {
    dataRequest: boolean;
    dataFailed: boolean;
    data: IItemProps[];
}

const initialState: TIngredientsDataState = {
    dataRequest: false,
    dataFailed: false,
    data: []
}

export const burgerIngredientsReducer = (state = initialState, action: TIngredientsDataActions) => {
    switch(action.type){
        case GET_INGREDIENTS_DATA: {
            return {
                ...state,
                dataRequest: true,
                dataFailed: false,
            }
        }
        case GET_INGREDIENTS_DATA_SUCCESS: {
            return {
                ...state,
                dataRequest: false,
                data: action.data,
            }
        }
        case GET_INGREDIENTS_DATA_FAILED: {
            return {
                ...state,
                dataRequest: false,
                dataFailed: true
            }
        }
        default: {
            return state
        }
    }
}