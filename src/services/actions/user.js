import { checkResponse, setCookie, deleteCookie, fetchWithRefresh, getCookie } from '../../utils/utils';
import { baseUrl } from '../../utils/constants';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGIN_FORM_SET_VALUE = 'LOGIN_FORM_SET_VALUE';
export const PROFILE_FORM_SET_VALUE = 'PROFILE_FORM_SET_VALUE';
export const REGISTRATION_FORM_SET_VALUE = "REGISTRATION_FORM_SET_VALUE";
export const PASSWORD_FORGOT_FORM_SET_VALUE = "PASSWORD_FORGOT_FORM_SET_VALUE";
export const PASSWORD_RESET_FORM_SET_VALUE = "PASSWORD_RESET_FORM_SET_VALUE";

export const USER_INFO_REQUEST = "USER_INFO_REQUEST";
export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS";
export const USER_INFO_FAILED = "USER_INFO_FAILED";

export const USER_INFO_PATCH_REQUEST = "USER_INFO_PATCH_REQUEST";
export const USER_INFO_PATCH_SUCCESS = "USER_INFO_PATCH_SUCCESS";
export const USER_INFO_PATCH_FAILED = "USER_INFO_PATCH_FAILED";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const USER_LOGOUT = "USER_LOGOUT";

const registrationURL = `${baseUrl}/auth/register`;
const logoutURL = `${baseUrl}/auth/logout`;
const loginURL = `${baseUrl}/auth/login`;
const getUserInfoURL = `${baseUrl}/auth/user`;
const passwordForgotURL = `${baseUrl}/password-reset`;
const passwordResetURL = `${baseUrl}/password-reset/reset`;

export const passwordForgot = () => (dispatch, getState) => {
    dispatch({
        type: FORGOT_PASSWORD_REQUEST
    });
    fetch(passwordForgotURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(getState().user.formPasswordForgot),
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

export const setPasswordForgotFormValue = (field, value) => ({
    type: PASSWORD_FORGOT_FORM_SET_VALUE,
    field,
    value
});

export const passwordReset = () => (dispatch, getState) => {
    dispatch({
        type: RESET_PASSWORD_REQUEST
    });
    fetch(passwordResetURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(getState().user.formPasswordReset),
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

export const setPasswordResetFormValue = (field, value) => ({
    type: PASSWORD_RESET_FORM_SET_VALUE,
    field,
    value
});

export const userLogIn = () => (dispatch, getState) => {
    dispatch({
        type: LOGIN_REQUEST
    });
    fetch(loginURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(getState().user.formLogin),
    })
    .then(checkResponse)
    .then(result => {
        if(result && result.success) {
            dispatch({
                type: LOGIN_SUCCESS,
                user: result.user,
            });
            let accessToken = result.accessToken.split("Bearer ")[1];
            setCookie("accessToken", accessToken);
            localStorage.setItem("refreshToken", result.refreshToken);
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

export const userGetInfo = () => (dispatch) => {
    dispatch({
        type: USER_INFO_REQUEST
    });
    fetchWithRefresh(getUserInfoURL, {
        method: 'GET',
        mode: 'cors',
        header: {
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

export const userInfoPatch = () => (dispatch, getState) => {
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
            body: JSON.stringify(getState().user.formProfile),
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

export const userLogOut = (dispatch) => {
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

export const setRegistrationFormValue = (field, value) => ({
    type: REGISTRATION_FORM_SET_VALUE,
    field,
    value
});

export const setProfileFormValue = (field, value) => ({
    type: PROFILE_FORM_SET_VALUE,
    field,
    value
});

export const setLoginFormValue = (field, value) => ({
    type: LOGIN_FORM_SET_VALUE,
    field,
    value
});

export const userRegistration = () => (dispatch, getState) => {
    dispatch({
        type: REGISTRATION_REQUEST
    });
    fetch(registrationURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(getState().user.formRegistration),
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