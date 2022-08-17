import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burgerIngredients';
import { burgerConstructorReducer } from './burgerConstructor';
import { orderReducer } from './order';
import { userReducer } from './user';
import { feedReducer } from './wsFeed';
import { ordersReducer } from './wsOrders';

const rootReducer = combineReducers({
    ingredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    user: userReducer,
    feed: feedReducer,
    profileOrders: ordersReducer,
});

export default rootReducer;