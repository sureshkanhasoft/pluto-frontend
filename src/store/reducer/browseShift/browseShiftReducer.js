import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    getShiftList: [],
    getShiftListError: [],

    getShiftDetails: [],
    getShiftDetailError: [],

    filterLoader: false,

    getHospitalList: [],
    getHospitalError: [],

    getFilterSpeciality: [],
    getFilterSpecialityError: [],

    shiftFilter: [],
    shiftFilterError: [],

    applyShiftSuccess: [],
    applyShiftError: []

}

const browseShiftReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SHIFT_REQUEST:
            return updateObject(state, {
                loading: true,
                getShiftList: "",
                getShiftListError: ""
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
                getShiftDetails: "",
                getShiftDetailError: ""
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


        // --------------------------------------

        case actionTypes.GET_HOSPITAL_REQUEST:
            return updateObject(state, {
                filterLoader: true,
                getHospitalList: "",
                getHospitalError: ""
            })

        case actionTypes.GET_HOSPITAL_SUCCESS:
            return updateObject(state, {
                filterLoader: false,
                getHospitalList: action.payload
            })

        case actionTypes.GET_HOSPITAL_ERROR:
            return updateObject(state, {
                filterLoader: false,
                getHospitalError: true
            })

        // ------------------------------

        case actionTypes.GET_FILTER_SPECIALITY_REQUEST:
            return updateObject(state, {
                filterLoader: true,
                getFilterSpeciality: "",
                getFilterSpecialityError: ""
            })

        case actionTypes.GET_FILTER_SPECIALITY_SUCCESS:
            return updateObject(state, {
                filterLoader: false,
                getFilterSpeciality: action.payload
            })

        case actionTypes.GET_FILTER_SPECIALITY_ERROR:
            return updateObject(state, {
                filterLoader: false,
                getFilterSpecialityError: true
            })


        // --------------------------------------


        case actionTypes.FILTER_SHIFT_REQUEST:
            return updateObject(state, {
                loading: true,
                shiftFilter: "",
                shiftFilterError: ""
            })

        case actionTypes.FILTER_SHIFT_SUCCESS:
            return updateObject(state, {
                loading: false,
                shiftFilter: action.payload
            })

        case actionTypes.FILTER_SHIFT_ERROR:
            return updateObject(state, {
                loading: false,
                shiftFilterError: true
            })


        // --------------------------------------

        case actionTypes.APPLY_SHIFT_REQUEST:
            return updateObject(state, {
                loading: true,
                applyShiftSuccess: "",
                applyShiftError: ""
            })

        case actionTypes.APPLY_SHIFT_SUCCESS:
            return updateObject(state, {
                loading: false,
                applyShiftSuccess: action.payload
            })

        case actionTypes.APPLY_SHIFT_ERROR:
            return updateObject(state, {
                loading: false,
                applyShiftError: true
            })


        default:
            return state
    }
}

export default browseShiftReducer