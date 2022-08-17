import { TOrder } from "../../types";
import { ordersReducer } from "./wsOrders";

import { orders } from "../../utils/testData";

import {
    WS_PROFILE_CONNECTION_START,
    WS_PROFILE_CONNECTION_SUCCESS,
    WS_PROFILE_CONNECTION_ERROR,
    WS_PROFILE_CONNECTION_CLOSED,
    WS_PROFILE_GET_MESSAGE
} from "../constants/ws";

type TProfileOrdersState = {
    wsProfileConnected: boolean,
    orders: Array<TOrder>,
}

const initialState: TProfileOrdersState = {
    wsProfileConnected: false,
    orders: []
}

describe('Profile orders reducer', () => {
    it('should handle WS_CONNECTION_START', () => {
        expect(ordersReducer(initialState, {
            type: WS_PROFILE_CONNECTION_START
        })).toEqual(initialState)
    })

    it('should handle WS_PROFILE_CONNECTION_SUCCESS', () => {
        expect(ordersReducer(initialState, {
            type: WS_PROFILE_CONNECTION_SUCCESS
        })).toEqual({            
            ...initialState,
            wsProfileConnected: true
        })
    })

    it('should handle WS_PROFILE_CONNECTION_ERROR', () => {
        expect(ordersReducer(initialState, {
            type: WS_PROFILE_CONNECTION_ERROR
        })).toEqual({            
            ...initialState,
            wsProfileConnected: false
        })
    })

    it('should handle WS_PROFILE_CONNECTION_CLOSED', () => {
        expect(ordersReducer({
                wsProfileConnected: true,
                orders: [orders[0], orders[1], orders[2]]
            },
            {
                type: WS_PROFILE_CONNECTION_CLOSED
            }
        )).toEqual(initialState)
    })

    it('should handle WS_PROFILE_GET_MESSAGE', () => {
        expect(ordersReducer({
                ...initialState,
                wsProfileConnected: true
            },
            {
                type: WS_PROFILE_GET_MESSAGE,
                data: {
                    orders: [orders[0], orders[1], orders[2]],
                    total: 100,
                    totalToday: 3
                }
            }
        )).toEqual({
            wsProfileConnected: true,
            orders: [orders[0], orders[1], orders[2]]
        })
    })
})