import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    swtichAccSuccess: [],
    swtichAccErrors: [],
}

const switchAccReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SWITCH_ACCOUNT_REQUEST:
            return updateObject(state, {
                loading: true,
                swtichAccSuccess: "",
                swtichAccErrors: ""
            })

        case actionTypes.SWITCH_ACCOUNT_SUCCESS:
            return updateObject(state, {
                loading: false,
                swtichAccSuccess: action.payload
            })

        case actionTypes.SWITCH_ACCOUNT_ERROR:
            return updateObject(state, {
                loading: false,
                swtichAccErrors: action.payload
            })



        default:
            return state
    }
}

export default switchAccReducer