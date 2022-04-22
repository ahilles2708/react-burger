import { OPEN_INGREDIENT_MODAL, CLOSE_INGREDIENT_MODAL } from '../actions/modal';

const initialState = {
    data: null
}

export const modalReducer = (state = initialState, action) => {
    switch(action.type){
        case OPEN_INGREDIENT_MODAL: {
            return {
                ...state,
                data: action.item,
            }
        }
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