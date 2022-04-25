import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    getOrglist: [],
    getOrgError: "",

    addOrgSuccess: [],
    addOrgError: [],

    updateSpeSuccess:[],
    updateSpeError:[]
}

const organizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORGANIZATION_REQUEST:
            return updateObject(state, {
                loading: true,
                getOrglist: "",
                getOrgError: ""
            })

        case actionTypes.GET_ORGANIZATION_SUCCESS:
            return updateObject(state, {
                loading: false,
                getOrglist: action.payload
            })

        case actionTypes.GET_ORGANIZATION_ERROR:
            return updateObject(state, {
                loading: false,
                getOrgError: true
            })

        // ---------------------------------
        case actionTypes.ADD_ANOTHER_ORG_REQUEST:
            return updateObject(state, {
                loading: true,
                addOrgSuccess: "",
                addOrgError: ""
            })

        case actionTypes.ADD_ANOTHER_ORG_SUCCESS:
            return updateObject(state, {
                loading: false,
                addOrgSuccess: action.payload
            })

        case actionTypes.ADD_ANOTHER_ORG_ERROR:
            return updateObject(state, {
                loading: false,
                addOrgError: true
            })


        // ---------------------------------


        // ---------------------------------
        case actionTypes.UPDATE_SPECIALITY_REQUEST:
            return updateObject(state, {
                loading: true,
                updateSpeSuccess: "",
                updateSpeError: ""
            })

        case actionTypes.UPDATE_SPECIALITY_SUCCESS:
            return updateObject(state, {
                loading: false,
                updateSpeSuccess: action.payload
            })

        case actionTypes.UPDATE_SPECIALITY_ERROR:
            return updateObject(state, {
                loading: false,
                updateSpeError: action.payload
            })
        default:
            return state
    }
}

export default organizationReducer