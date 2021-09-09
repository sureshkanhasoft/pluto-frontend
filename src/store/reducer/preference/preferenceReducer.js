import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    getPreferenceList: [],
    getPreferenceErrors: [],

    createPreferenceErrors: [],
    createPreferenceSuccess:[],

    updatePreferenceErrors: [],
    updatePreferenceSuccess:[],
}

const profileReducer = (state = initialState, action) => {
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

        // --------------

        case actionTypes.UPDATE_PREFERENCE_REQUEST:
            return updateObject(state, {
                loading: true,
                updatePreferenceSuccess:"",
                updatePreferenceErrors:""
            })

        case actionTypes.UPDATE_PREFERENCE_SUCCESS:
            return updateObject(state, {
                loading: false,
                updatePreferenceSuccess: action.payload
            })

        case actionTypes.UPDATE_PREFERENCE_ERROR:
            return updateObject(state, {
                loading: false,
                updatePreferenceErrors: action.payload
            })
        

        default:
            return state
    }
}

export default profileReducer