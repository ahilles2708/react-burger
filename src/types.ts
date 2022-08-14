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
    sortID?: string
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

export interface IParams {
    id: string;
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
    exact?: boolean;
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

export type TSortMoving = {
    from: number;
    to: number;
}

export type TCreateOrder = {
    ingredients: string[];
}

export interface IOrderNweOwner {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface IOrderNewData {
    ingredients: IItemProps[];
    _id: string;
    owner: IOrderNweOwner;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price: number;
}

export type TOrder = {
    ingredients: Array<string>,
    name: string,
    _id: string,
    status: 'done' | 'pending' | 'created';
    number: number,
    createdAt: string,
    updatedAt: string
}

export type TOrderList = {
    orders: Array<TOrder>,
    total: number,
    totalToday: number
}

export type TOrderBoard = {
    done: Array<number>;
    pending: Array<number>;
}

export type TBurgerStructureIngredient = {
    count: number,
    ingredient: IItemProps | null
}

export type TBurgerStructure = {
    bun: IItemProps | null
    ingredients: {
        [T: string]: TBurgerStructureIngredient
    },
    totalValue: number
}