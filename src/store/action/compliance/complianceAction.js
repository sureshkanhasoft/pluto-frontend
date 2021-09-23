import { apiClient } from "../../../config/apiClient";
import { ADD_DOCUMENT_ERROR, ADD_DOCUMENT_REQUEST, ADD_DOCUMENT_SUCCESS } from "../actiontypes";

export const addDocuments = () => {
    return async (dispatch) => {
        dispatch(addDocumentsRequest())
        await apiClient(true).get(`api/signee/add-document`)
            .then(response => {
                const dataItem = response.data;
                dispatch(addDocumentsSuccess(dataItem))
            }).catch(error => {
                dispatch(addDocumentsSuccess(""))
                dispatch(addDocumentsFailure(error))
            });
    }

}

export const addDocumentsRequest = () => {
    return {
        type: ADD_DOCUMENT_REQUEST
    }
}

export const addDocumentsSuccess = data => {
    return {
        type: ADD_DOCUMENT_SUCCESS,
        payload: data
    }
}

export const addDocumentsFailure = error => {
    return {
        type: ADD_DOCUMENT_ERROR,
        payload: error
    }
}