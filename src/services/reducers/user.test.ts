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
import { userReducer } from "./user";

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

describe('User reducer', () => {
    it('Should handle REGISTRATION_FORM_SET_VALUE', () => {
        expect(userReducer(initialState, {
            type: REGISTRATION_FORM_SET_VALUE,
            field: 'name',
            value: 'Test',
        })).toEqual({
            ...initialState,
            formRegistration: {
                ...initialState.formRegistration,
                name: 'Test',
            }
        })
    })
    it('Should handle REGISTRATION_REQUEST', () => {
        expect(userReducer(initialState, {
            type: REGISTRATION_REQUEST,
        })).toEqual({
            ...initialState,
            registrationRequest: true,
            registrationFailed: false
        })
    })
    it('Should handle REGISTRATION_FAILED', () => {
        expect(userReducer(initialState, {
            type: REGISTRATION_FAILED,
        })).toEqual({
            ...initialState,
            registrationRequest: false,
            registrationFailed: true
        })
    })
    it('Should handle REGISTRATION_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            registrationRequest: true,
            registrationFailed: false
        }, {
            type: REGISTRATION_SUCCESS,
        })).toEqual({
            ...initialState,
            formRegistration: {
                ...initialState.formRegistration
            },
            registrationRequest: false,
        })
    })
    it('Should handle USER_LOGOUT', () => {
        expect(userReducer({
            ...initialState,
            info: {
                name: 'Test',
                email: 'test@test.ru',
            },
            formProfile: {
                name: 'Test',
                email: 'test@test.ru',
                password: '12345',
            },
            isAuth: true,
        }, {
            type: USER_LOGOUT,
        })).toEqual({
            ...initialState,
            info: {
                name: '',
                email: '',
            },
            formProfile: {
                ...initialState.formProfile,
            },
            isAuth: false,
        })
    })
    it('Should handle PROFILE_FORM_SET_VALUE', () => {
        expect(userReducer(initialState, {
            type: PROFILE_FORM_SET_VALUE,
            field: 'name',
            value: 'Test',
        })).toEqual({
            ...initialState,
            formProfile: {
                ...initialState.formProfile,
                name: 'Test',
            }
        })
    })
    it('Should handle LOGIN_FORM_SET_VALUE', () => {
        expect(userReducer(initialState, {
            type: LOGIN_FORM_SET_VALUE,
            field: 'email',
            value: 'test@test.ru',
        })).toEqual({
            ...initialState,
            formLogin: {
                ...initialState.formLogin,
                email: 'test@test.ru',
            }
        })
    })
    it('Should handle PASSWORD_FORGOT_FORM_SET_VALUE', () => {
        expect(userReducer(initialState, {
            type: PASSWORD_FORGOT_FORM_SET_VALUE,
            field: 'email',
            value: 'test@test.ru',
        })).toEqual({
            ...initialState,
            formPasswordForgot: {
                ...initialState.formPasswordForgot,
                email: 'test@test.ru',
            }
        })
    })
    it('Should handle PASSWORD_RESET_FORM_SET_VALUE', () => {
        expect(userReducer(initialState, {
            type: PASSWORD_RESET_FORM_SET_VALUE,
            field: 'token',
            value: '12345',
        })).toEqual({
            ...initialState,
            formPasswordReset: {
                ...initialState.formPasswordReset,
                token: '12345',
            }
        })
    })
    it('Should handle USER_INFO_REQUEST', () => {
        expect(userReducer(initialState, {
            type: USER_INFO_REQUEST,
        })).toEqual({
            ...initialState,
            userInfoRequest: true,
            userInfoFailed: false,
        })
    })
    it('Should handle USER_INFO_FAILED', () => {
        expect(userReducer(initialState, {
            type: USER_INFO_FAILED,
        })).toEqual({
            ...initialState,
            userInfoRequest: false,
            userInfoFailed: true,
        })
    })
    it('Should handle USER_INFO_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            info: {
                name: '',
                email: '',
            },
            isAuth: false,
            userInfoRequest: true,
            userInfoFailed: false,
        }, {
            type: USER_INFO_SUCCESS,
            name: 'Test',
            email: 'test@test.ru',
        })).toEqual({
            ...initialState,
            info: {
                name: 'Test',
                email: 'test@test.ru',
            },
            isAuth: true,
            userInfoRequest: false,
            userInfoFailed: false,
        })
    })
    it('Should handle LOGIN_REQUEST', () => {
        expect(userReducer(initialState, {
            type: LOGIN_REQUEST,
        })).toEqual({
            ...initialState,
            loginRequest: true,
            loginFailed: false,
        })
    })
    it('Should handle LOGIN_FAILED', () => {
        expect(userReducer(initialState, {
            type: LOGIN_FAILED,
        })).toEqual({
            ...initialState,
            loginRequest: false,
            loginFailed: true,
        })
    })
    it('Should handle LOGIN_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            loginRequest: true,
            loginFailed: false,
        }, {
            type: LOGIN_SUCCESS,
            user: {
                name: 'Test',
                email: 'test@test.ru',
            }
        })).toEqual({
            ...initialState,
            info: {
                name: 'Test',
                email: 'test@test.ru',
            },
            formLogin: {
                ...initialState.formLogin
            },
            isAuth: true,
            loginRequest: false,
            loginFailed: false,
        })
    })
    it('Should handle USER_INFO_PATCH_REQUEST', () => {
        expect(userReducer(initialState, {
            type: USER_INFO_PATCH_REQUEST,
        })).toEqual({
            ...initialState,
            userInfoPatchRequest: true,
            userInfoPatchFailed: false,
        })
    })
    it('Should handle USER_INFO_PATCH_FAILED', () => {
        expect(userReducer(initialState, {
            type: USER_INFO_PATCH_FAILED,
        })).toEqual({
            ...initialState,
            userInfoPatchRequest: false,
            userInfoPatchFailed: true,
        })
    })
    it('Should handle USER_INFO_PATCH_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            formProfile: {
                name: 'Test',
                email: 'test@test.ru',
                password: '12345',
            },
            userInfoPatchRequest: true,
            userInfoPatchFailed: false,
        }, {
            type: USER_INFO_PATCH_SUCCESS,
        })).toEqual({
            ...initialState,
            formProfile: {
                ...initialState.formProfile
            },
            userInfoPatchRequest: false,
            userInfoPatchFailed: false,
        })
    })
    it('Should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(userReducer(initialState, {
            type: FORGOT_PASSWORD_REQUEST,
        })).toEqual({
            ...initialState,
            passwordForgotRequest: true,
            passwordForgotSuccess: false,
            passwordForgotFailed: false
        })
    })
    it('Should handle FORGOT_PASSWORD_FAILED', () => {
        expect(userReducer(initialState, {
            type: FORGOT_PASSWORD_FAILED,
        })).toEqual({
            ...initialState,
            passwordForgotRequest: false,
            passwordForgotFailed: true,
            passwordForgotSuccess: false,
        })
    })
    it('Should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            formPasswordForgot: {
                email: 'test@test.ru',
            },
            passwordForgotRequest: true,
            passwordForgotSuccess: false,
            passwordForgotFailed: false
        }, {
            type: FORGOT_PASSWORD_SUCCESS,
        })).toEqual({
            ...initialState,
            formPasswordForgot: {
                email: '',
            },
            passwordForgotRequest: false,
            passwordForgotSuccess: true,
            passwordForgotFailed: false
        })
    })
    it('Should handle RESET_PASSWORD_REQUEST', () => {
        expect(userReducer(initialState, {
            type: RESET_PASSWORD_REQUEST,
        })).toEqual({
            ...initialState,
            passwordResetRequest: true,
            passwordResetSuccess: false,
            passwordResetFailed: false
        })
    })
    it('Should handle RESET_PASSWORD_FAILED', () => {
        expect(userReducer(initialState, {
            type: RESET_PASSWORD_FAILED,
        })).toEqual({
            ...initialState,
            passwordResetRequest: false,
            passwordResetFailed: true,
            passwordResetSuccess: false,
        })
    })
    it('Should handle RESET_PASSWORD_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            formPasswordReset: {
                password: '12345',
                token: '1a2s3d',
            },
            passwordResetRequest: true,
            passwordResetSuccess: false,
            passwordResetFailed: false
        }, {
            type: RESET_PASSWORD_SUCCESS,
        })).toEqual({
            ...initialState,
            formPasswordReset: {
                password: '',
                token: '',
            },
            passwordResetRequest: false,
            passwordResetSuccess: true,
            passwordResetFailed: false
        })
    })
})