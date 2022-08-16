import { IItemProps } from "../../types";
import { TConstructorActions } from "../actions/burgerConstructor";
import { 
    CONSTRUCTOR_ADD_ITEM,
    CONSTRUCTOR_DELETE_ITEM,
    CONSTRUCTOR_SORT,
    CONSTRUCTOR_RESET
} from "../constants/burgerConstructor";
import { ingredients, bun } from "../../utils/testData";
import { burgerConstructorReducer } from './burgerConstructor';

export type TConstructorState = {
    bun: IItemProps | null;
    items: IItemProps[];
}

const initialState: TConstructorState = {
    bun: null,
    items: []
}

describe('Burger constructor reducer', () => {
    it('should handle CONSTRUCTOR_ADD_ITEM', () => {
        const modifiedState = {
            ...initialState,
        }
        const action = {
            type: CONSTRUCTOR_ADD_ITEM,
            item: ingredients[0]
        }
        const expectedState = {
            ...initialState,
            items: [
                ...initialState.items,
                ingredients[0]
            ]
        }
        expect(burgerConstructorReducer(modifiedState, action)).toEqual(expectedState)
    })
    it('should handle CONSTRUCTOR_DELETE_ITEM', () => {
        const modifiedState = {
            ...initialState,
            items: [ingredients[0], ingredients[1], ingredients[2]] 
        }
        expect(burgerConstructorReducer(modifiedState, {
            type: CONSTRUCTOR_DELETE_ITEM,
            item: 0
        })).toEqual({
            ...initialState,
            items: [
                ...modifiedState.items.slice(0, 0),
                ...modifiedState.items.slice(0 + 1),
            ]
        })
    })
    it('should handle CONSTRUCTOR_SORT', () => {
        const modifiedState = {
            ...initialState,
            items: [ingredients[0], ingredients[1], ingredients[2]]
        }
        const action = {
            type: CONSTRUCTOR_SORT,
            moving: {
                from: 0,
                to: 1
            }
        }
        const expectedState = {
            ...modifiedState,
            items: [ingredients[1], ingredients[0], ingredients[2]]
        }
        expect(burgerConstructorReducer(modifiedState, action)).toEqual(expectedState)
    })
    it('should handle CONSTRUCTOR_RESET', () => {
        const modifiedState = {
            ...initialState
        }
        const action = {
            type: CONSTRUCTOR_RESET
        }
        const expectedState = {
            ...initialState
        }
        expect(burgerConstructorReducer(modifiedState, action)).toEqual(expectedState)
    })
})