import { apiClient } from "../../../config/apiClient";
import { GET_ORGANIZATION_ERROR, GET_ORGANIZATION_REQUEST, GET_ORGANIZATION_SUCCESS } from "../actiontypes";

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