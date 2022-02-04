import { apiClient } from "../../../config/apiClient";
import { 
    CHANGE_PASSWORD_ERROR, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS,
    GET_ORGANIZATION_ERROR,
    GET_ORGANIZATION_REQUEST,
    GET_ORGANIZATION_SUCCESS,
    GET_PROFILE_ERROR, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, 
    GET_SIGNEE_SPE_ERROR, 
    GET_SIGNEE_SPE_REQUEST, 
    GET_SIGNEE_SPE_SUCCESS, 
    UPDATE_PROFILE_ERROR, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS 
} from "../actiontypes";

export const getProfile = () => {
    return async(dispatch) =>{
        dispatch(getProfileRequest())
        await apiClient(true).get(`api/signee/get-signee-details`)
        .then(response => {
            dispatch(getProfileSuccess(response.data));
            const dataItem = response.data;
            const signeeInfo = JSON.parse(window.localStorage.getItem('signeeInfo'));
            signeeInfo.profile_pic = dataItem.data.profile_pic
            localStorage.setItem('signeeInfo', JSON.stringify(signeeInfo));
        }).catch(error => {
            dispatch(getProfileError(error))
        })
    }
}

export const getProfileRequest = () => {
    return {
        type: GET_PROFILE_REQUEST
    }
}
export const getProfileSuccess = (data) => {
    return {
        type: GET_PROFILE_SUCCESS,
        payload:data
    }
}
export const getProfileError = (error) => {
    return {
        type: GET_PROFILE_ERROR,
        payload:error
    }
}

// -----------------------------

export const updateProfile = (data) => {
    const signeeInfo = JSON.parse(window.localStorage.getItem('signeeInfo'));
    signeeInfo.first_name = data.first_name;
    return async(dispatch) =>{
        dispatch(updateProfileRequest())
        await apiClient(true).post(`api/signee/signee-profile-update`, data)
        .then(response => {
            localStorage.setItem('signeeInfo', JSON.stringify(signeeInfo));
            const data = response.data
            if (data.status === true) {
                dispatch(updateProfileSuccess(data))
                setTimeout(() => {
                        dispatch(getProfile())
                        window.location.reload()
                }, 4000);
            } else {
                dispatch(updateProfileError(data))
            }
        }).catch(error => {
            dispatch(updateProfileError(error))

        })
    }
}

export const updateProfileRequest = () => {
    return {
        type: UPDATE_PROFILE_REQUEST
    }
}
export const updateProfileSuccess = (data) => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload:data
    }
}
export const updateProfileError = (error) => {
    return {
        type: UPDATE_PROFILE_ERROR,
        payload:error
    }
}


// -----------------------------

export const changePassword = (data) => {
    return async(dispatch) =>{
        dispatch(changePasswordRequest())
        await apiClient(true).post(`api/signee/signee-change-password`, data)
        .then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(changePasswordSuccess(data))
            } else {
                dispatch(changePasswordError(data))
            }
        }).catch(error => {
            dispatch(changePasswordError(error))

        })
    }
}

export const changePasswordRequest = () => {
    return {
        type: CHANGE_PASSWORD_REQUEST
    }
}
export const changePasswordSuccess = (data) => {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        payload:data
    }
}
export const changePasswordError = (error) => {
    return {
        type: CHANGE_PASSWORD_ERROR,
        payload:error
    }
}


// -----------------------------

export const getOrganizationList = () => {
    return async (dispatch) => {
        dispatch(getOrganizationListRequest())
        await apiClient(true).get(`api/signee/get-organisation-add-org`)
        .then(response => {
            const dataItem = response.data;
            dispatch(getOrganizationListSuccess(dataItem))
        }).catch(error => {
            dispatch(getOrganizationListSuccess([]))
            dispatch(getOrganizationListFailure(error))
        });
    }

}

export const getOrganizationListRequest = () => {
    return {
        type: GET_ORGANIZATION_REQUEST
    }
}

export const getOrganizationListSuccess = data => {
    return {
        type: GET_ORGANIZATION_SUCCESS,
        payload: data
    }
}

export const getOrganizationListFailure = error => {
    return {
        type: GET_ORGANIZATION_ERROR,
        payload: error
    }
}


// -----------------------------

export const getSigneeSpeciality = () => {
    return async(dispatch) =>{
        dispatch(getSigneeSpeRequest())
        await apiClient(true).get(`api/signee/get-signee-speciality`)
        .then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(getSigneeSpeSuccess(data))
            } else {
                dispatch(getSigneeSpeError(data))
            }
        }).catch(error => {
            dispatch(getSigneeSpeError(error))

        })
    }
}

export const getSigneeSpeRequest = () => {
    return {
        type: GET_SIGNEE_SPE_REQUEST
    }
}
export const getSigneeSpeSuccess = (data) => {
    return {
        type: GET_SIGNEE_SPE_SUCCESS,
        payload:data
    }
}
export const getSigneeSpeError = (error) => {
    return {
        type: GET_SIGNEE_SPE_ERROR,
        payload:error
    }
}