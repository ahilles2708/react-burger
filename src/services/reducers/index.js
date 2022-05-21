import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burgerIngredients';
import { burgerConstructorReducer } from './burgerConstructor';
import { orderReducer } from './order';
import { modalReducer } from './modal';
import { userReducer } from './user';

const rootReducer = combineReducers({
    ingredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    modal: modalReducer,
    order: orderReducer,
    user: userReducer,
});

export default rootReducer;