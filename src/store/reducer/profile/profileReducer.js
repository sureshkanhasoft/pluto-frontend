import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    getProfileList: [],
    getProfileErrors: [],

    updateProfileErrors: [],
    updateProfileSuccess:[],
    
    passChange: [],
    passErrors: [],

    getsigneeError:[],
    getsigneeSuccess:[],

}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROFILE_REQUEST:
            return updateObject(state, {
                loading: true,
                getProfileErrors:"",
                getProfileList:""
            })

        case actionTypes.GET_PROFILE_SUCCESS:
            return updateObject(state, {
                loading: false,
                getProfileList: action.payload
            })

        case actionTypes.GET_PROFILE_ERROR:
            return updateObject(state, {
                loading: false,
                getProfileErrors: action.payload
            })

        // --------------

        case actionTypes.UPDATE_PROFILE_REQUEST:
            return updateObject(state, {
                loading: true,
                updateProfileErrors:"",
                updateProfileSuccess:""
            })

        case actionTypes.UPDATE_PROFILE_SUCCESS:
            return updateObject(state, {
                loading: false,
                updateProfileSuccess: action.payload
            })

        case actionTypes.UPDATE_PROFILE_ERROR:
            return updateObject(state, {
                loading: false,
                updateProfileErrors: action.payload
            })

        // ---------
        case actionTypes.CHANGE_PASSWORD_REQUEST:
            return updateObject(state, {
                loading: true,
                passErrors:"",
                passChange:""
            })

        case actionTypes.CHANGE_PASSWORD_SUCCESS:
            return updateObject(state, {
                loading: false,
                passChange: action.payload
            })

        case actionTypes.CHANGE_PASSWORD_ERROR:
            return updateObject(state, {
                loading: false,
                passErrors: action.payload
            })


        // ----------------------------------
        case actionTypes.GET_SIGNEE_SPE_REQUEST:
            return updateObject(state, {
                loading: true,
                getsigneeSuccess:"",
                getsigneeError:""
            })

        case actionTypes.GET_SIGNEE_SPE_SUCCESS:
            return updateObject(state, {
                loading: false,
                getsigneeSuccess: action.payload
            })

        case actionTypes.GET_SIGNEE_SPE_ERROR:
            return updateObject(state, {
                loading: false,
                getsigneeError: action.payload
            })

        default:
            return state
    }
}

export default profileReducer