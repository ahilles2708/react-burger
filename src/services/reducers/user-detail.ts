import { TUserActions } from "../actions/user";
import { USER_LOGOUT } from "../constants/user";

export type TUserLoggedState = {
    user: {
        name: string;
        email: string;
    }
    isAuth: boolean;
}

const initialState: TUserLoggedState = {
    user: {
        name: '',
        email: '',
    },
    isAuth: false,
}

export const userReducer = (state = initialState, action: TUserActions) => {
    switch(action.type){
        case USER_LOGOUT: {
            return initialState
        }
    }
}