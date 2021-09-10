import { apiClient } from "../../../config/apiClient";
import {
    CREATE_PREFERENCE_ERROR,CREATE_PREFERENCE_REQUEST,CREATE_PREFERENCE_SUCCESS,
    GET_PREFERENCE_ERROR,GET_PREFERENCE_REQUEST,GET_PREFERENCE_SUCCESS,
    UPDATE_PREFERENCE_ERROR, UPDATE_PREFERENCE_REQUEST, UPDATE_PREFERENCE_SUCCESS, 
} from "../actiontypes";

export const getPreference = () => {
    return async(dispatch) =>{
        dispatch(getPreferenceRequest())
        await apiClient(true).get(`api/superadmin/get-detail`)
        .then(response => {
            dispatch(getPreferenceSuccess(response.data))
        }).catch(error => {
            dispatch(getPreferenceError(error))

        })
    }
}

export const getPreferenceRequest = () => {
    return {
        type: GET_PREFERENCE_REQUEST
    }
}
export const getPreferenceSuccess = (data) => {
    return {
        type: GET_PREFERENCE_SUCCESS,
        payload:data
    }
}
export const getPreferenceError = (error) => {
    return {
        type: GET_PREFERENCE_ERROR,
        payload:error
    }
}
// -----------------------------

export const createPreference = (data) => {
    return async(dispatch) =>{
        dispatch(createPreferenceRequest())
        await apiClient(true).put(`api/superadmin/update-profile`, data)
        .then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(createPreferenceSuccess(data))
                setTimeout(() => {
                    dispatch(getPreference())
                }, 2000);
            } else {
                dispatch(createPreferenceError(data))
            }
        }).catch(error => {
            dispatch(createPreferenceError(error))

        })
    }
}

export const createPreferenceRequest = () => {
    return {
        type: CREATE_PREFERENCE_REQUEST
    }
}
export const createPreferenceSuccess = (data) => {
    return {
        type: CREATE_PREFERENCE_SUCCESS,
        payload:data
    }
}
export const createPreferenceError = (error) => {
    return {
        type: CREATE_PREFERENCE_ERROR,
        payload:error
    }
}

// -----------------------------

export const updatePreference = (data) => {
    return async(dispatch) =>{
        dispatch(updatePreferenceRequest())
        await apiClient(true).put(`api/superadmin/update-profile`, data)
        .then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(updatePreferenceSuccess(data))
                setTimeout(() => {
                    dispatch(getPreference())
                }, 2000);
            } else {
                dispatch(updatePreferenceError(data))
            }
        }).catch(error => {
            dispatch(updatePreferenceError(error))

        })
    }
}

export const updatePreferenceRequest = () => {
    return {
        type: UPDATE_PREFERENCE_REQUEST
    }
}
export const updatePreferenceSuccess = (data) => {
    return {
        type: UPDATE_PREFERENCE_SUCCESS,
        payload:data
    }
}
export const updatePreferenceError = (error) => {
    return {
        type: UPDATE_PREFERENCE_ERROR,
        payload:error
    }
}

