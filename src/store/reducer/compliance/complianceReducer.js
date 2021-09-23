import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    addDocument:[],
    addDocumentError:""
}

const complianceReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_DOCUMENT_REQUEST:
            return updateObject(state, {
                loading: true,
                addDocument:"",
                addDocumentError:""
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

        default:
            return state
    }
}

export default complianceReducer