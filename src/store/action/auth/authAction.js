import { apiClient } from '../../../config/apiClient';
import history from '../../../utils/HistoryUtils';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, 
    // FORGOT_SUCCESS, FORGOT_ERROR, FORGOT_REQUEST ,
    // CHANGE_PASSWORD_SUCCESS , CHANGE_PASSWORD_REQUEST,CHANGE_PASSWORD_ERROR
} from '../actiontypes';

export const login = (data) => {
    return async(dispatch) => {
        dispatch(getLoginRequest())
        await apiClient(true).post(`api/superadmin/signin`,data)
        .then(response => {
            console.log('response: ', response);
            const data = response.data
            if (data && data.status === true) {
                dispatch(getLoginSuccess(data))
                setTimeout(() => {
                    history.push('./shift')
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

// export const forgotpassword = ({ email }) => {
//     return (dispatch) => {
//         dispatch(getForgotRequest());
//         axios.post(`${Config.API_URL}api/forgot`, {
//             headers: {
//                 'content-type': 'application/json',
//             },
//             email,
//         }).then(response => {
//             const data = response.data
//             if (data && data.status === true) {
//                 dispatch(getForgotSuccess(data));
//             } else {
//                 dispatch(getForgotFailure(data));
//             }
//         }).catch(error => {
//             dispatch(getForgotFailure(error.message));
//         })
//     }
// }

// const getForgotRequest = () => {
//     return {
//         type: FORGOT_REQUEST
//     }
// }

// const getForgotSuccess = data => {
//     return {
//         type: FORGOT_SUCCESS,
//         payload: data
//     }
// }

// const getForgotFailure = error => {
//     return {
//         type: FORGOT_ERROR,
//         payload: error
//     }
// }

// // ------------------------------------

// export const changepassword = ({ decode_id, password, confirm_password }) => {
//     return (dispatch) => {
//         dispatch(getChangePasswordRequest());
//         axios.post(`${Config.API_URL}api/reset-password`, {
//             headers: {
//                 'content-type': 'application/json',
//             },
//             decode_id, 
//             password, 
//             confirm_password
//         }).then(response => {
//             const data = response.data
//             if (data && data.status === true) {
//                 dispatch(getChangePasswordSuccess(data));
//                 setTimeout(() => {
//                     history.push('./login')
//                 }, 3000);
//             } else {
//                 dispatch(getChangePasswordFailure(data));
//             }
//         }).catch(error => {
//             dispatch(getChangePasswordFailure(error.message));
//         })
//     }
// }


// export const getChangePasswordRequest = () => {
//     return {
//         type: CHANGE_PASSWORD_REQUEST
//     }
// }

// export const getChangePasswordSuccess = data => {
//     return {
//         type: CHANGE_PASSWORD_SUCCESS,
//         payload: data
//     }
// }

// export const getChangePasswordFailure = error => {
//     return {
//         type: CHANGE_PASSWORD_ERROR,
//         payload: error
//     }
// }