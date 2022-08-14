import {
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL
} from "../constants/modal";

export interface IOpenIngredientModal {
    readonly type: typeof OPEN_INGREDIENT_MODAL;
}
export interface ICloseIngredientModal {
    readonly type: typeof CLOSE_INGREDIENT_MODAL;
}

export type TModalActions = 
    | IOpenIngredientModal
    | ICloseIngredientModal;