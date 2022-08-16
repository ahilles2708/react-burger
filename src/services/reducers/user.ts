import { TUserActions } from "../actions/user";
import {
    REGISTRATION_FORM_SET_VALUE,
    REGISTRATION_REQUEST,
    REGISTRATION_FAILED,
    REGISTRATION_SUCCESS,
    USER_LOGOUT,
    PROFILE_FORM_SET_VALUE,
    LOGIN_REQUEST,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FORM_SET_VALUE,
    USER_INFO_REQUEST,
    USER_INFO_FAILED,
    USER_INFO_SUCCESS,
    USER_INFO_PATCH_FAILED,
    USER_INFO_PATCH_SUCCESS,
    USER_INFO_PATCH_REQUEST,
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    PASSWORD_FORGOT_FORM_SET_VALUE,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    PASSWORD_RESET_FORM_SET_VALUE,
} from "../constants/user";

export type TUserState = {
    formRegistration: {
        name: string;
        email: string;
        password: string;
    };
    registrationRequest: boolean;
    registrationFailed: boolean;
    formLogin: {
        email: string;
        password: string;
    };
    loginRequest: boolean;
    loginFailed: boolean;
    formProfile: {
        name: string;
        email: string;
        password: string;
    };
    userInfoPatchRequest: boolean;
    userInfoPatchFailed: boolean;
    formPasswordForgot: {
        email: string;
    };
    passwordForgotRequest: boolean;
    passwordForgotFailed: boolean;
    passwordForgotSuccess: boolean;
    formPasswordReset: {
        password: string;
        token: string;

    };
    passwordResetRequest: boolean;
    passwordResetFailed: boolean;
    passwordResetSuccess: boolean;
    info: {
        name: string;
        email: string;
    },
    isAuth: boolean;
    userInfoRequest: boolean;
    userInfoFailed: boolean;
}

const initialState: TUserState = {
    formRegistration: {
        name: '',
        email: '',
        password: '',
    },
    registrationRequest: false,
    registrationFailed: false,
    formLogin: {
        email: '',
        password: '',
    },
    loginRequest: false,
    loginFailed: false,
    formProfile: {
        name: '',
        email: '',
        password: '',
    },
    userInfoPatchRequest: false,
    userInfoPatchFailed: false,
    formPasswordForgot: {
        email: '',
    },
    passwordForgotRequest: false,
    passwordForgotFailed: false,
    passwordForgotSuccess: false,
    formPasswordReset: {
        password: '',
        token: '',

    },
    passwordResetRequest: false,
    passwordResetFailed: false,
    passwordResetSuccess: false,
    info: {
        name: '',
        email: '',
    },
    isAuth: false,
    userInfoRequest: false,
    userInfoFailed: false,
}

export const userReducer = ( state = initialState, action: TUserActions) => {
    switch(action.type){
        //заполняем форму регистрации
        case REGISTRATION_FORM_SET_VALUE: {
            return {
                ...state,
                formRegistration: {
                    ...state.formRegistration,
                    [action.field]: action.value
                }
            }
        }
        case PROFILE_FORM_SET_VALUE: {
            return {
                ...state,
                formProfile: {
                    ...state.formProfile,
                    [action.field]: action.value
                }
            }
        }
        case LOGIN_FORM_SET_VALUE: {
            return {
                ...state,
                formLogin: {
                    ...state.formLogin,
                    [action.field]: action.value
                }
            }
        }
        case PASSWORD_FORGOT_FORM_SET_VALUE: {
            return {
                ...state,
                formPasswordForgot: {
                    ...state.formPasswordForgot,
                    [action.field]: action.value
                }
            }
        }
        case PASSWORD_RESET_FORM_SET_VALUE: {
            return {
                ...state,
                formPasswordReset: {
                    ...state.formPasswordReset,
                    [action.field]: action.value
                }
            }
        }
        case USER_INFO_REQUEST: {
            return {
                ...state,
                userInfoRequest: true,
                userInfoFailed: false,
            }
        }
        case USER_INFO_FAILED: {
            return {
                ...state,
                userInfoRequest: false,
                userInfoFailed: true,
            }
        }
        case USER_INFO_SUCCESS: {
            return {
                ...state,
                info: {
                    name: action.name,
                    email: action.email,
                },
                isAuth: true,
                userInfoRequest: false,
                userInfoFailed: false,
            }
        }
        case USER_INFO_PATCH_REQUEST: {
            return {
                ...state,
                userInfoPatchRequest: true,
                userInfoPatchFailed: false,
            }
        }
        case USER_INFO_PATCH_FAILED: {
            return {
                ...state,
                userInfoPatchRequest: false,
                userInfoPatchFailed: true,
            }
        }
        case USER_INFO_PATCH_SUCCESS: {
            return {
                ...state,
                formProfile: {
                    ...initialState.formProfile
                },
                userInfoPatchRequest: false,
                userInfoPatchFailed: false,
            }
        }
        case REGISTRATION_REQUEST: {
            return {
                ...state,
                registrationRequest: true,
                registrationFailed: false
            }
        }
        case REGISTRATION_SUCCESS: {
            return {
                ...state,
                formRegistration: {
                    ...initialState.formRegistration
                },
                registrationRequest: false
            }
        }
        case REGISTRATION_FAILED: {
            return {
                ...state,
                registrationRequest: false,
                registrationFailed: true
            }
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false,
            }
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true,
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                info: {
                    name: action.user.name,
                    email: action.user.email
                },
                formLogin: {
                    ...initialState.formLogin
                },
                isAuth: true,
                loginRequest: false,
                loginFailed: false,
            }
        }
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                passwordForgotRequest: true,
                passwordForgotSuccess: false,
                passwordForgotFailed: false
            }
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                passwordForgotRequest: false,
                passwordForgotFailed: true,
                passwordForgotSuccess: false,
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                formPasswordForgot: {
                    email: '',
                },
                passwordForgotRequest: false,
                passwordForgotSuccess: true,
                passwordForgotFailed: false
            }
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                passwordResetRequest: true,
                passwordResetSuccess: false,
                passwordResetFailed: false
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                passwordResetRequest: false,
                passwordResetFailed: true,
                passwordResetSuccess: false,
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                formPasswordReset: {
                    password: '',
                    token: '',
                },
                passwordResetRequest: false,
                passwordResetSuccess: true,
                passwordResetFailed: false
            }
        }
        case USER_LOGOUT: {
            return {
                ...state,
                info: {
                    name: '',
                    email: '',
                },
                formProfile: {
                    ...initialState.formProfile,
                },
                isAuth: false,
            }
        }
        default: {
            return state;
        }
    }
}