import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from "redux-thunk";

import { TConstructorActions } from "../actions/burgerConstructor";
import { TIngredientsDataActions } from "../actions/burgerIngredients";
import { TModalActions } from "../actions/modal";
import { TCreateOrderActions } from "../actions/order";
import { TUserActions } from '../actions/user';
import { TWSFeedActions } from '../actions/wsFeed';
import { TWSProfileOrdersActions } from '../actions/wsOrders';


import { store }  from "../store";

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
    | TConstructorActions
    | TIngredientsDataActions
    | TModalActions
    | TCreateOrderActions
    | TUserActions
    | TWSFeedActions
    | TWSProfileOrdersActions;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = Dispatch<TApplicationActions>;