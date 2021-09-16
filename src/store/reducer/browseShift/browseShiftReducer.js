import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    getShiftList:[],
    getShiftListError:[],

    getShiftDetails:[],
    getShiftDetailError:[]
}

const browseShiftReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SHIFT_REQUEST:
            return updateObject(state, {
                loading: true,
                getShiftList:"",
                getShiftListError:""
            })

        case actionTypes.GET_SHIFT_SUCCESS:
            return updateObject(state, {
                loading: false,
                getShiftList: action.payload
            })

        case actionTypes.GET_SHIFT_ERROR:
            return updateObject(state, {
                loading: false,
                getShiftListError: true
            })
        
        // --------------------------------------

        case actionTypes.GET_SHIFT_DETAIL_REQUEST:
            return updateObject(state, {
                loading: true,
                getShiftDetails:"",
                getShiftDetailError:""
            })

        case actionTypes.GET_SHIFT_DETAIL_SUCCESS:
            return updateObject(state, {
                loading: false,
                getShiftDetails: action.payload
            })

        case actionTypes.GET_SHIFT_DETAIL_ERROR:
            return updateObject(state, {
                loading: false,
                getShiftDetailError: true
            })

        default:
            return state
    }
}

export default browseShiftReducer