import { TModalActions } from '../actions/modal';
import { IItemProps } from '../../types';
import {
    CLOSE_INGREDIENT_MODAL
} from "../constants/modal";

export type TModalState = {
    data: IItemProps | null;
}

const initialState: TModalState = {
    data: null
}

export const modalReducer = (state = initialState, action: TModalActions) => {
    switch(action.type){
        case CLOSE_INGREDIENT_MODAL: {
            return {
                ...state,
                data: null
            }
        }
        default: {
            return state
        }
    }
}