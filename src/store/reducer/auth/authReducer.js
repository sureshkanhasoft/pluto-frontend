import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    userInfo: [],
    loginErrors: [],

    registerSuccess:[],
    errors:"",

    forgotsuccess: [],
    forgoterrors: [],

    resetSuccess: [],
    resetErrors: [],
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return updateObject(state, {
                loading: true,
                loginErrors:"",
                userInfo:""
            })
        case actionTypes.LOGIN_SUCCESS:
            return updateObject(state, {
                loading: false,
                userInfo: action.payload,
            })
        case actionTypes.LOGIN_ERROR:
            return updateObject(state, {
                loading: false,
                loginErrors: action.payload
            })

        // --------

        case actionTypes.REGISTER_REQUEST:
            return updateObject(state, {
                loading: true,
                registerSuccess:"",
                errors:"",
            })
        case actionTypes.REGISTER_SUCCESS:
            return updateObject(state, {
                loading: false,
                registerSuccess: action.payload,
            })
        case actionTypes.REGISTER_ERROR:
            return updateObject(state, {
                loading: false,
                errors: action.payload
            })

        // --------

        case actionTypes.FORGOT_REQUEST:
            return updateObject(state, {
                loading: true,
                forgotsuccess:"",
                forgoterrors:""
            })
        case actionTypes.FORGOT_SUCCESS:
            return updateObject(state, {
                loading: false,
                forgotsuccess: action.payload,
            })
        case actionTypes.FORGOT_ERROR:
            return updateObject(state, {
                loading: false,
                forgoterrors: action.payload
            })

        // --------
        
        case actionTypes.RESET_PASSWORD_REQUEST:
            return updateObject(state, {
                loading: true,
                resetSuccess:"",
                resetErrors:""
            })
        case actionTypes.RESET_PASSWORD_SUCCESS:
            return updateObject(state, {
                loading: false,
                resetSuccess: action.payload,
            })
        case actionTypes.RESET_PASSWORD_ERROR:
            return updateObject(state, {
                loading: false,
                resetErrors: action.payload
            })


        default:
            return state
    }
}

export default authReducer