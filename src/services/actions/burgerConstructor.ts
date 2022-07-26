import { v4 as uuid } from 'uuid';
import { IItemProps, TSortMoving } from '../../types';

import {
    CONSTRUCTOR_ADD_ITEM,
    CONSTRUCTOR_DELETE_ITEM,
    CONSTRUCTOR_SORT,
    CONSTRUCTOR_RESET
} from "../constants/burgerConstructor";

export interface IConstructorItemAdd {
    readonly type: typeof CONSTRUCTOR_ADD_ITEM;
    readonly item: IItemProps;
}
export interface IConstructorItemDelete {
    readonly type: typeof CONSTRUCTOR_DELETE_ITEM;
    readonly item: number;
}
export interface IConstructorSort {
    readonly type: typeof CONSTRUCTOR_SORT;
    readonly moving: TSortMoving;
}
export interface IConstructorReset {
    readonly type: typeof CONSTRUCTOR_RESET;
}

export const addItemToConstructor = (item: IItemProps): IConstructorItemAdd => {
    return {
        type: CONSTRUCTOR_ADD_ITEM,
        item: {
            ...item,
            sortID: uuid(),
        }
    }
}

export type TConstructorActions = 
    | IConstructorItemAdd
    | IConstructorItemDelete
    | IConstructorSort
    | IConstructorReset;