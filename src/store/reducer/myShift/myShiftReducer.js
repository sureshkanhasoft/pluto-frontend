import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    getMyShiftList: {}
}

const myShiftReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_MY_SHIFT_LIST:
            return updateObject(state, {
                getMyShiftList: action.payload
            })

        default:
            return state
    }
}

export default myShiftReducer