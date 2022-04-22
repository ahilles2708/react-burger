import { v4 as uuid } from 'uuid';

export const CONSTRUCTOR_ADD_ITEM = 'CONSTRUCTOR_ADD_ITEM';
export const CONSTRUCTOR_DELETE_ITEM = 'CONSTRUCTOR_DELETE_ITEM';
export const CONSTRUCTOR_SORT = 'CONSTRUCTOR_SORT';
export const CONSTRUCTOR_RESET = 'CONSTRUCTOR_RESET';

export const addItemToConstructor = (item) => {
    return {
        type: CONSTRUCTOR_ADD_ITEM,
        item: {
            ...item,
            sortID: uuid(),
        }
    }
}