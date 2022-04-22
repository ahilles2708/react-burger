import { 
    CREATE_NEW_ORDER_REQUEST,
    CREATE_NEW_ORDER_FAILED,
    CREATE_NEW_ORDER_SUCCESS,
    RESET_ORDER
} from '../actions/order';

const initialState = {
    orderRequest: false,
    orderFailed: false,
    openOrderModal: false,
    orderNew: null,
}

export const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_NEW_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
                openOrderModal: true,
            };
        }
        case CREATE_NEW_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
            };
        }
        case CREATE_NEW_ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderNew: action.data
            };
        }
        case RESET_ORDER: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}