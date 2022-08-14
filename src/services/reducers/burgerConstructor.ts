import { IItemProps } from "../../types";
import { TConstructorActions } from "../actions/burgerConstructor";
import { 
    CONSTRUCTOR_ADD_ITEM,
    CONSTRUCTOR_DELETE_ITEM,
    CONSTRUCTOR_SORT,
    CONSTRUCTOR_RESET
} from "../constants/burgerConstructor";

export type TConstructorState = {
    bun: IItemProps | null;
    items: IItemProps[];
}

const initialState: TConstructorState = {
    bun: null,
    items: []
}

export const burgerConstructorReducer = (state = initialState, action: TConstructorActions) => {
    switch(action.type){
        case CONSTRUCTOR_ADD_ITEM: {
            if (action.item.type === 'bun') {
                return {
                    ...state,
                    bun: action.item,
                }
            }
            return {
                ...state,
                items: [
                    ...state.items,
                    action.item
                ]
            }
        }
        case CONSTRUCTOR_DELETE_ITEM: {
            return {
                ...state,
                items: [
                    ...state.items.slice(0, action.item),
                    ...state.items.slice(action.item + 1),
                ],
            }
        }
        case CONSTRUCTOR_SORT: {
            const items = [...state.items];
            items.splice(action.moving.to, 0, items.splice(action.moving.from, 1)[0]);
            return {
                ...state,
                items: items,
            }
        }
        case CONSTRUCTOR_RESET: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}