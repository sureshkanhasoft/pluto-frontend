import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    getPreferenceList: [],
    getPreferenceErrors: [],

    createPreferenceErrors: [],
    createPreferenceSuccess:[],
}

const preferenceReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PREFERENCE_REQUEST:
            return updateObject(state, {
                loading: true,
                getPreferenceList:"",
                getPreferenceErrors:""
            })

        case actionTypes.GET_PREFERENCE_SUCCESS:
            return updateObject(state, {
                loading: false,
                getPreferenceList: action.payload
            })

        case actionTypes.GET_PREFERENCE_ERROR:
            return updateObject(state, {
                loading: false,
                getPreferenceErrors: action.payload
            })

        // ------------

        case actionTypes.CREATE_PREFERENCE_REQUEST:
            return updateObject(state, {
                loading: true,
                createPreferenceSuccess:"",
                createPreferenceErrors:""
            })

        case actionTypes.CREATE_PREFERENCE_SUCCESS:
            return updateObject(state, {
                loading: false,
                createPreferenceSuccess: action.payload
            })

        case actionTypes.CREATE_PREFERENCE_ERROR:
            return updateObject(state, {
                loading: false,
                createPreferenceErrors: action.payload
            })
        

        default:
            return state
    }
}

export default preferenceReducer