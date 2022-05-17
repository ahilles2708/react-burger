import { USER_LOGOUT } from "../actions/user";

const initialState = {
    user: {
        name: '',
        email: '',
    },
    isAuth: false,
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_LOGOUT: {
            return initialState
        }
    }
}