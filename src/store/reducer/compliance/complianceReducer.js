import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    addDocument: [],
    addDocumentError: "",

    documentDetail: [],
    documentDetailError: [],

    deleteDocument: [],
    deleteDocumentError: []
}

const complianceReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_DOCUMENT_REQUEST:
            return updateObject(state, {
                loading: true,
                addDocument: "",
                addDocumentError: ""
            })

        case actionTypes.ADD_DOCUMENT_SUCCESS:
            return updateObject(state, {
                loading: false,
                addDocument: action.payload
            })

        case actionTypes.ADD_DOCUMENT_ERROR:
            return updateObject(state, {
                loading: false,
                addDocumentError: true
            })


        // --------------------------------------

        case actionTypes.DOCUMENT_DETAIL_REQUEST:
            return updateObject(state, {
                loading: true,
                documentDetail: "",
                documentDetailError: ""
            })

        case actionTypes.DOCUMENT_DETAIL_SUCCESS:
            return updateObject(state, {
                loading: false,
                documentDetail: action.payload
            })

        case actionTypes.DOCUMENT_DETAIL_ERROR:
            return updateObject(state, {
                loading: false,
                documentDetailError: true
            })


        // --------------------------------------

        case actionTypes.DELETE_DOCUMENT_REQUEST:
            return updateObject(state, {
                loading: true,
                deleteDocument: "",
                deleteDocumentError: ""
            })

        case actionTypes.DELETE_DOCUMENT_SUCCESS:
            return updateObject(state, {
                loading: false,
                deleteDocument: action.payload
            })

        case actionTypes.DELETE_DOCUMENT_ERROR:
            return updateObject(state, {
                loading: false,
                deleteDocumentError: true
            })

        default:
            return state
    }
}

export default complianceReducer