import { checkResponse, setCookie, deleteCookie, fetchWithRefresh, getCookie } from '../../utils/utils';
import { baseUrl } from '../../utils/constants';

import {
    REGISTRATION_REQUEST,
    REGISTRATION_FAILED,
    REGISTRATION_SUCCESS,
    REGISTRATION_FORM_SET_VALUE,
    LOGIN_REQUEST,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FORM_SET_VALUE,
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_INFO_FAILED,
    USER_INFO_PATCH_REQUEST,
    USER_INFO_PATCH_SUCCESS,
    USER_INFO_PATCH_FAILED,
    PROFILE_FORM_SET_VALUE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    PASSWORD_FORGOT_FORM_SET_VALUE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    PASSWORD_RESET_FORM_SET_VALUE,
    USER_LOGOUT
} from "../constants/user";
import { AppDispatch, AppThunk } from '../types';
import { TUserState } from '../reducers/user';

const registrationURL = `${baseUrl}/auth/register`;
const logoutURL = `${baseUrl}/auth/logout`;
const loginURL = `${baseUrl}/auth/login`;
const getUserInfoURL = `${baseUrl}/auth/user`;
const passwordForgotURL = `${baseUrl}/password-reset`;
const passwordResetURL = `${baseUrl}/password-reset/reset`;

export interface IRegistrationRequest {
    readonly type: typeof REGISTRATION_REQUEST;
}
export interface IRegistrationFailed {
    readonly type: typeof REGISTRATION_FAILED;
}
export interface IRegistrationSuccess {
    readonly type: typeof REGISTRATION_SUCCESS;
}
export interface IRegistrationFormSetValue {
    readonly type: typeof REGISTRATION_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface ILoginRequest {
    readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginFailed {
    readonly type: typeof LOGIN_FAILED;
}
export interface ILoginSuccess {
    readonly type: typeof LOGIN_SUCCESS;
    readonly user: {
        name: string;
        email: string;
    }
}
export interface ILoginFormSetValue {
    readonly type: typeof LOGIN_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface IUserInfoRequest {
    readonly type: typeof USER_INFO_REQUEST;
}
export interface IUserInfoFailed {
    readonly type: typeof USER_INFO_FAILED;
}
export interface IUserInfoSuccess {
    readonly type: typeof USER_INFO_SUCCESS;
    readonly name: string;
    readonly email: string;
}

export interface IUserInfoPatchRequest {
    readonly type: typeof USER_INFO_PATCH_REQUEST;
}
export interface IUserInfoPatchFailed {
    readonly type: typeof USER_INFO_PATCH_FAILED;
}
export interface IUserInfoPatchSuccess {
    readonly type: typeof USER_INFO_PATCH_SUCCESS;
}
export interface IUserInfoPatchFormSetValue {
    readonly type: typeof PROFILE_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface IForgotPasswordRequest {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordFailed {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}
export interface IForgotPasswordSuccess {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
export interface IForgotPasswordFormSetValue {
    readonly type: typeof PASSWORD_FORGOT_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED;
}
export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFormSetValue {
    readonly type: typeof PASSWORD_RESET_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface IUserLogout {
    readonly type: typeof USER_LOGOUT;
}


export const passwordForgot: AppThunk = (user: TUserState) => (dispatch: AppDispatch) => {
    dispatch({
        type: FORGOT_PASSWORD_REQUEST
    });
    fetch(passwordForgotURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user.formPasswordForgot),
    })
    .then(checkResponse)
    .then(result => {
        if(result && result.success) {
            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
            });
        } else {
            dispatch({
                type: FORGOT_PASSWORD_FAILED
            })
        }
    })
    .catch(
        err => {
            dispatch({
                type: FORGOT_PASSWORD_FAILED
            })
        }
    )
}

export const setPasswordForgotFormValue = (field: string, value: string) => ({
    type: PASSWORD_FORGOT_FORM_SET_VALUE,
    field,
    value
});

export const passwordReset: AppThunk = (user: TUserState) => (dispatch: AppDispatch) => {
    dispatch({
        type: RESET_PASSWORD_REQUEST
    });
    fetch(passwordResetURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user.formPasswordReset),
    })
    .then(checkResponse)
    .then(result => {
        if(result && result.success) {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
            });
        } else {
            dispatch({
                type: RESET_PASSWORD_FAILED
            })
        }
    })
    .catch(
        err => {
            dispatch({
                type: RESET_PASSWORD_FAILED
            })
        }
    )
}

export const setPasswordResetFormValue = (field: string, value: string) => ({
    type: PASSWORD_RESET_FORM_SET_VALUE,
    field,
    value
});

export const userLogIn: AppThunk = (user: TUserState) => (dispatch: AppDispatch) => {
    dispatch({
        type: LOGIN_REQUEST
    });
    fetch(loginURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user.formLogin),
    })
    .then(checkResponse)
    .then(result => {
        if(result && result.success) {
            let accessToken = result.accessToken.split("Bearer ")[1];
            setCookie("accessToken", accessToken);
            localStorage.setItem("refreshToken", result.refreshToken);
            dispatch({
                type: LOGIN_SUCCESS,
                user: result.user,
            });
        } else {
            dispatch({
                type: LOGIN_FAILED,
            });
        }
    })
    .catch(
        err => {
            dispatch({
                type: LOGIN_FAILED
            })
        }
    )
}

export const userGetInfo: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({
        type: USER_INFO_REQUEST
    });
    fetchWithRefresh(getUserInfoURL, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            'Authorization': "Bearer " + getCookie("accessToken"),
        },
    }).then(result => {
        if(result && result.success) {
            dispatch({
                type: USER_INFO_SUCCESS,
                name: result.user.name,
                email: result.user.email,
            });
        } else {
            dispatch({
                type: USER_INFO_FAILED,
            });
        }
    }).catch(
        err => {
            dispatch({
                type: USER_INFO_FAILED
            })
        }
    )
}

export const userInfoPatch: AppThunk = (user: TUserState) => (dispatch: AppDispatch) => {
    dispatch({
        type: USER_INFO_PATCH_REQUEST,
    });
    fetchWithRefresh(
        getUserInfoURL,
        {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                'Authorization': "Bearer " + getCookie("accessToken"),
            },
            body: JSON.stringify(user.formProfile),
        }
    ).then(result => {
        if(result && result.success) {
            dispatch({
                type: USER_INFO_PATCH_SUCCESS,
            });
            userGetInfo();
        } else {
            dispatch({
                type: USER_INFO_PATCH_FAILED,
            });
        }
    }).catch(
        err => {
            dispatch({
                type: USER_INFO_PATCH_FAILED
            })
        }
    )
}

export const userLogOut = (dispatch: AppDispatch) => {
    fetch(logoutURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({"token": localStorage.getItem("refreshToken")}),
    })
    .then(checkResponse)
    .then(result => {
        if(result && result.success) {
            localStorage.clear();
            deleteCookie('accessToken');
            dispatch({
                type: USER_LOGOUT
            })
        }
    })
    .catch(
        err => {
            alert("Ошибка выхода из системы!");
            console.log(err);
        }
    )
}

export const setRegistrationFormValue = (field: string, value: string) => ({
    type: REGISTRATION_FORM_SET_VALUE,
    field,
    value
});

export const setProfileFormValue = (field: string, value: string) => ({
    type: PROFILE_FORM_SET_VALUE,
    field,
    value
});

export const setLoginFormValue = (field: string, value: string) => ({
    type: LOGIN_FORM_SET_VALUE,
    field,
    value
});

export const userRegistration = (user: TUserState) => (dispatch: AppDispatch) => {
    dispatch({
        type: REGISTRATION_REQUEST
    });
    fetch(registrationURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user.formRegistration),
    })
    .then(checkResponse)
    .then(result => {
        if(result && result.success) {
            dispatch({
                type: REGISTRATION_SUCCESS,
            });
            let accessToken = result.accessToken.split("Bearer ")[1];
            setCookie("accessToken", accessToken);
            localStorage.setItem("refreshToken", result.refreshToken);
            userGetInfo();
        } else {
            dispatch({
                type: REGISTRATION_FAILED,
            });
        }
    })
    .catch(
        err => {
            dispatch({
                type: REGISTRATION_FAILED
            })
        }
    )
}

export type TUserActions = 
    | IRegistrationRequest
    | IRegistrationFailed
    | IRegistrationSuccess
    | IRegistrationFormSetValue
    | ILoginRequest
    | ILoginFailed
    | ILoginSuccess
    | ILoginFormSetValue
    | IUserInfoRequest
    | IUserInfoFailed
    | IUserInfoSuccess
    | IUserInfoPatchRequest
    | IUserInfoPatchFailed
    | IUserInfoPatchSuccess
    | IUserInfoPatchFormSetValue
    | IForgotPasswordRequest
    | IForgotPasswordFailed
    | IForgotPasswordSuccess
    | IForgotPasswordFormSetValue
    | IResetPasswordRequest
    | IResetPasswordFailed
    | IResetPasswordSuccess
    | IResetPasswordFormSetValue
    | IUserLogout;