import { apiClient } from '../../../config/apiClient';
import history from '../../../utils/HistoryUtils';
import { 
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, 
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR, 
    FORGOT_SUCCESS, FORGOT_ERROR, FORGOT_REQUEST, 
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR ,
    
} from '../actiontypes';

export const login = (data) => {
    return async(dispatch) => {
        dispatch(getLoginRequest())
        await apiClient(true).post(`api/signee/signin`,data)
        .then(response => {
            console.log('response: ', response);
            const data = response.data
            if (data && data.status === true) {
                dispatch(getLoginSuccess(data))
                console.log('data: ', data);
                localStorage.setItem('signeeInfo', JSON.stringify(data.data));
                localStorage.setItem('token', JSON.stringify(data.data.token));
                setTimeout(() => {
                    history.push('/shift')
                }, 2000);
            } else {
                dispatch(getLoginFailure(data))
            }
        }).catch(error => {
            dispatch(getLoginFailure(error.message))
        })
    }
}

const getLoginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

const getLoginSuccess = data => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

const getLoginFailure = error => {
    return {
        type: LOGIN_ERROR,
        payload: error
    }
}


// ---------------------------

export const registerUser = (data) => {
    return async(dispatch) => {
        dispatch(registerRequest())
        await apiClient(true).post(`api/signee/signup`,data)
        .then(response => {
            console.log('response: ', response);
            const data = response.data
            if (data && data.status === true) {
                dispatch(registerSuccess(data))
                setTimeout(() => {
                    history.push('/login')
                }, 2000);
            } else {
                dispatch(registerFailure(data))
            }
        }).catch(error => {
            dispatch(registerFailure(error.message))
        })
    }
}

const registerRequest = () => {
    return {
        type: REGISTER_REQUEST
    }
}

const registerSuccess = data => {
    return {
        type: REGISTER_SUCCESS,
        payload: data
    }
}

const registerFailure = error => {
    return {
        type: REGISTER_ERROR,
        payload: error
    }
}

export const forgotPassword = (data) => {
    return async(dispatch) => {
        dispatch(getForgotRequest());
        await apiClient(true).post(`api/signee/forgot-signee`,data)
        .then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(getForgotSuccess(data));
            } else {
                dispatch(getForgotFailure(data));
            }
        }).catch(error => {
            dispatch(getForgotFailure(error.message));
        })
    }
}

const getForgotRequest = () => {
    return {
        type: FORGOT_REQUEST
    }
}

const getForgotSuccess = data => {
    return {
        type: FORGOT_SUCCESS,
        payload: data
    }
}

const getForgotFailure = error => {
    return {
        type: FORGOT_ERROR,
        payload: error
    }
}

// // ------------------------------------

export const resetPassword = (data) => {
    return async(dispatch) => {
        dispatch(resetPasswordRequest());
        await apiClient(true).post(`api/signee/reset-password`, data)
        .then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(resetPasswordSuccess(data));
                setTimeout(() => {
                    history.push('/login')
                }, 3000);
            } else {
                dispatch(resetPasswordFailure(data));
            }
        }).catch(error => {
            dispatch(resetPasswordFailure(error.message));
        })
    }
}


export const resetPasswordRequest = () => {
    return {
        type: RESET_PASSWORD_REQUEST
    }
}

export const resetPasswordSuccess = data => {
    return {
        type: RESET_PASSWORD_SUCCESS,
        payload: data
    }
}

export const resetPasswordFailure = error => {
    return {
        type: RESET_PASSWORD_ERROR,
        payload: error
    }
}