import { apiClient } from "../../../config/apiClient";
import { ADD_DOCUMENT_ERROR, ADD_DOCUMENT_REQUEST, ADD_DOCUMENT_SUCCESS, DELETE_DOCUMENT_ERROR, DELETE_DOCUMENT_REQUEST, DELETE_DOCUMENT_SUCCESS, DOCUMENT_DETAIL_ERROR, DOCUMENT_DETAIL_REQUEST, DOCUMENT_DETAIL_SUCCESS } from "../actiontypes";

export const addDocuments = (formdata) => {
    // console.log('formdata111: ', formdata);
    // console.log('formdata111: ', JSON.stringify(formdata));
    return async (dispatch) => {
        dispatch(addDocumentsRequest())
        await apiClient(true).post(`api/signee/upload-document`, formdata)
            .then(response => {
                const dataItem = response.data;
                // console.log('dataItem: ', dataItem);
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

// ------------------------------------------------------

export const documentDetails = (key) => {
    return async (dispatch) => {
        dispatch(documentDetailsRequest())
        await apiClient(true).get(`api/signee/get-signee-document?key=${key}`)
            .then(response => {
                const dataItem = response.data;
                dispatch(documentDetailsSuccess(dataItem))
            }).catch(error => {
                dispatch(documentDetailsSuccess(""))
                dispatch(documentDetailsFailure(error))
            });
    }

}

export const documentDetailsRequest = () => {
    return {
        type: DOCUMENT_DETAIL_REQUEST
    }
}

export const documentDetailsSuccess = data => {
    return {
        type: DOCUMENT_DETAIL_SUCCESS,
        payload: data
    }
}

export const documentDetailsFailure = error => {
    return {
        type: DOCUMENT_DETAIL_ERROR,
        payload: error
    }
}


// ------------------------------------------------------

export const deleteDocument = (id) => {
    return async (dispatch) => {
        dispatch(deleteDocumentRequest())
        await apiClient(true).delete(`api/signee/delete-document/${id}`)
            .then(response => {
                const dataItem = response.data;
                dispatch(deleteDocumentSuccess(dataItem))
            }).catch(error => {
                dispatch(deleteDocumentSuccess(""))
                dispatch(deleteDocumentFailure(error))
            });
    }
}

export const deleteDocumentRequest = () => {
    return {
        type: DELETE_DOCUMENT_REQUEST
    }
}

export const deleteDocumentSuccess = data => {
    return {
        type: DELETE_DOCUMENT_SUCCESS,
        payload: data
    }
}

export const deleteDocumentFailure = error => {
    return {
        type: DELETE_DOCUMENT_ERROR,
        payload: error
    }
}