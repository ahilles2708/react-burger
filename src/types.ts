import { ETabs } from "./enums";

export interface IModalOverlayProps {
    toggle: () => void;
}

export interface IBurgerConstructorElementProps {
    item: IItemProps;
    index: number;
}

export interface IItemProps {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    sortID?: number
}

export type TItemDraggable = IItemProps & {
    index: number;
}

export interface DragItem {
    index: number;
    id: string;
    type: string;
    derp: string;
  }

export interface IState {
    order: any;
    ingredients: IIngredientsState;
    modal: {data: any};
    burgerConstructor: IConstructorState;
    user: any;
}

export interface IParams {
    id: string;
}

export interface IIngredientsState {
    data: IItemProps[];
    dataFailed: any;
    dataRequest: any;
}
export interface IConstructorState {
    bun: IItemProps;
    items: IItemProps[];
}

export interface IIngredientCategoryProps {
    caption: string,
    captionID: ETabs,
    items: IItemProps[],
}

export interface ICounters {
    [name: string]: number; 
} 

export interface IProtectedRouteProps {
    path: string;
    exact: boolean;
}

export type TCookieProps = {
    [name: string]: number | string | boolean;
  }
  
export type TExpiredCookie = {
    expires?: number | Date | string;
}

export interface ILocation {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: undefined;
}

export interface ILocationBackground {
    background?: ILocation;
}

export interface ILocationStateFrom {
    from?: ILocation;
  }