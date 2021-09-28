import { apiClient } from "../../../config/apiClient";
import { ADD_ANOTHER_ORG_ERROR, ADD_ANOTHER_ORG_REQUEST, ADD_ANOTHER_ORG_SUCCESS, GET_ORGANIZATION_ERROR, GET_ORGANIZATION_REQUEST, GET_ORGANIZATION_SUCCESS, UPDATE_SPECIALITY_ERROR, UPDATE_SPECIALITY_REQUEST, UPDATE_SPECIALITY_SUCCESS } from "../actiontypes";

export const getOrganization = () => {
    return async (dispatch) => {
        dispatch(getOrganizationRequest())
        await apiClient(true).get(`api/signee/get-organisation`)
        .then(response => {
            const dataItem = response.data;
            dispatch(getOrganizationSuccess(dataItem))
        }).catch(error => {
            dispatch(getOrganizationSuccess([]))
            dispatch(getOrganizationFailure(error))
        });
    }

}

export const getOrganizationRequest = () => {
    return {
        type: GET_ORGANIZATION_REQUEST
    }
}

export const getOrganizationSuccess = data => {
    return {
        type: GET_ORGANIZATION_SUCCESS,
        payload: data
    }
}

export const getOrganizationFailure = error => {
    return {
        type: GET_ORGANIZATION_ERROR,
        payload: error
    }
}


// ---------------------------------------------------------


export const addAnotherOrganization = (data) => {
    return async (dispatch) => {
        dispatch(addAnotherOrganizationRequest())
        await apiClient(true).post(`api/signee/add-org`,data)
        .then(response => {
            const dataItem = response.data;
            dispatch(addAnotherOrganizationSuccess(dataItem))
        }).catch(error => {
            dispatch(addAnotherOrganizationSuccess([]))
            dispatch(addAnotherOrganizationFailure(error))
        });
    }

}

export const addAnotherOrganizationRequest = () => {
    return {
        type: ADD_ANOTHER_ORG_REQUEST
    }
}

export const addAnotherOrganizationSuccess = data => {
    return {
        type: ADD_ANOTHER_ORG_SUCCESS,
        payload: data
    }
}

export const addAnotherOrganizationFailure = error => {
    return {
        type: ADD_ANOTHER_ORG_ERROR,
        payload: error
    }
}


// -------------------------------------------------

export const updateSpeciality = (data, id) => {
    return async (dispatch) => {
        dispatch(updateSpecialityRequest())
        await apiClient(true).put(`api/signee/update-signee-speciality/${id}`,data)
        .then(response => {
            const dataItem = response.data;
            if(dataItem && dataItem.status === true) {
                dispatch(updateSpecialitySuccess(dataItem))
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                dispatch(updateSpecialityFailure(data))
            }
        }).catch(error => {
            dispatch(updateSpecialitySuccess(""))
            dispatch(updateSpecialityFailure(error))
        });
    }

}

export const updateSpecialityRequest = () => {
    return {
        type: UPDATE_SPECIALITY_REQUEST
    }
}

export const updateSpecialitySuccess = data => {
    return {
        type: UPDATE_SPECIALITY_SUCCESS,
        payload: data
    }
}

export const updateSpecialityFailure = error => {
    return {
        type: UPDATE_SPECIALITY_ERROR,
        payload: error
    }
}