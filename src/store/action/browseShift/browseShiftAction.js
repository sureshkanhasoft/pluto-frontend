import { apiClient } from "../../../config/apiClient";
import { 
    GET_SHIFT_DETAIL_ERROR, GET_SHIFT_DETAIL_REQUEST, GET_SHIFT_DETAIL_SUCCESS, 
    GET_SHIFT_ERROR, GET_SHIFT_REQUEST, GET_SHIFT_SUCCESS 
} from "../actiontypes";

export const getShift = () => {
    return async (dispatch) => {
        dispatch(getShiftRequest())
        await apiClient(true).get(`api/signee/shift-list`)
        .then(response => {
            const dataItem = response.data;
            dispatch(getShiftSuccess(dataItem))
        }).catch(error => {
            dispatch(getShiftSuccess([]))
            dispatch(getShiftFailure(error))
        });
    }

}

export const getShiftRequest = () => {
    return {
        type: GET_SHIFT_REQUEST
    }
}

export const getShiftSuccess = data => {
    return {
        type: GET_SHIFT_SUCCESS,
        payload: data
    }
}

export const getShiftFailure = error => {
    return {
        type: GET_SHIFT_ERROR,
        payload: error
    }
}

// --------------------------------------


export const getShiftDetail = (id) => {
    return async (dispatch) => {
        dispatch(getShiftDetailRequest())
        await apiClient(true).get(`api/signee/view-shift-details/${id}`)
        .then(response => {
            const dataItem = response.data;
            dispatch(getShiftDetailSuccess(dataItem))
        }).catch(error => {
            dispatch(getShiftDetailSuccess([]))
            dispatch(getShiftDetailFailure(error))
        });
    }
}

export const getShiftDetailRequest = () => {
    return {
        type: GET_SHIFT_DETAIL_REQUEST
    }
}

export const getShiftDetailSuccess = data => {
    return {
        type: GET_SHIFT_DETAIL_SUCCESS,
        payload: data
    }
}

export const getShiftDetailFailure = error => {
    return {
        type: GET_SHIFT_DETAIL_ERROR,
        payload: error
    }
}

