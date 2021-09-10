import { apiClient } from "../../../config/apiClient";
import {
    CREATE_PREFERENCE_ERROR,CREATE_PREFERENCE_REQUEST,CREATE_PREFERENCE_SUCCESS,
    GET_PREFERENCE_ERROR,GET_PREFERENCE_REQUEST,GET_PREFERENCE_SUCCESS,
} from "../actiontypes";

export const getPreference = () => {
    return async(dispatch) =>{
        dispatch(getPreferenceRequest())
        await apiClient(true).get(`api/signee/get-preferences`)
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
        await apiClient(true).post(`api/signee/add-preferences`, data)
        .then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(createPreferenceSuccess(data))
                // setTimeout(() => {
                //     dispatch(getPreference())
                // }, 2000);
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


