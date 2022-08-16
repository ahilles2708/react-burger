import { IItemProps } from '../../types';
import { bun, ingredients } from '../../utils/testData';
import { TIngredientsDataActions } from '../actions/burgerIngredients';
import {
    GET_INGREDIENTS_DATA,
    GET_INGREDIENTS_DATA_FAILED,
    GET_INGREDIENTS_DATA_SUCCESS,
} from '../constants/burgerIngredients';
import { burgerIngredientsReducer } from './burgerIngredients';

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

describe('Burger ingredients reducer', () => {
    it('Should handle GET_INGREDIENTS_DATA', () => {
        expect(burgerIngredientsReducer(initialState, {
            type: GET_INGREDIENTS_DATA
        })).toEqual({
            ...initialState,
            dataRequest: true,
            dataFailed: false,
        })
    })
    it('Should handle GET_INGREDIENTS_DATA_FAILED', () => {
        expect(burgerIngredientsReducer(initialState, {
            type: GET_INGREDIENTS_DATA_FAILED
        })).toEqual({
            ...initialState,
            dataRequest: false,
            dataFailed: true,
        })
    })
    it('Should handle GET_INGREDIENTS_DATA_SUCCESS', () => {
        expect(burgerIngredientsReducer(initialState, {
            type: GET_INGREDIENTS_DATA_SUCCESS,
            data: [bun]
        })).toEqual({
            ...initialState,
            data: [bun]
        })
    })
})