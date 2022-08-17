import { IOrderNewData } from '../../types';
import { TCreateOrderActions } from '../actions/order';
import { 
    CREATE_NEW_ORDER_REQUEST,
    CREATE_NEW_ORDER_FAILED,
    CREATE_NEW_ORDER_SUCCESS,
    RESET_ORDER
} from '../constants/order';
import { orderReducer } from './order';
import { newOrder } from '../../utils/testData';

export type TOrderState = {
    orderRequest: boolean;
    orderFailed: boolean;
    openOrderModal: boolean;
    orderNew: IOrderNewData | null;
}

const initialState: TOrderState = {
    orderRequest: false,
    orderFailed: false,
    openOrderModal: false,
    orderNew: null,
}

describe('Order reducer', ()=>{
    it('should create request for new order', ()=>{
        expect(orderReducer(initialState, {
            type: CREATE_NEW_ORDER_REQUEST
        })).toEqual({
            ...initialState,
            orderRequest: true,
            orderFailed: false,
            openOrderModal: true,
        })
    })
    it('should create new order is failed', ()=>{
        expect(orderReducer(initialState, {
            type: CREATE_NEW_ORDER_FAILED
        })).toEqual({
            ...initialState,
            orderRequest: false,
            orderFailed: true,
        })
    })
    it('should create new order is success', ()=>{
        expect(orderReducer(initialState, {
            type: CREATE_NEW_ORDER_SUCCESS,
            data: newOrder
        })).toEqual({
            ...initialState,
            orderRequest: false,
            orderNew: newOrder
        })
    })
    it('should create new order is success', ()=>{
        expect(orderReducer(initialState, {
            type: RESET_ORDER,
        })).toEqual({
            ...initialState,
        })
    })
})