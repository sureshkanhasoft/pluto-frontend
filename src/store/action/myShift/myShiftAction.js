import { apiClient } from "../../../config/apiClient";
import * as actionTypes from "../actiontypes";
import { notificationFail , notificationSuccess} from "../notificationMsg";

// get my shift list for signee
export const getMyShift = () => {
    return async (dispatch) => {
        await apiClient(true).get(`api/signee/my-shift`)
            .then(response => {
                dispatch(notificationSuccess(response.data.message))
                dispatch(getMyShiftSuccess(response.data))
            }).catch(error => {
                dispatch(notificationFail(error))
            });
    }
}

// success get my shift list for signee
export const getMyShiftSuccess = data => {
    return {
        type: actionTypes.GET_MY_SHIFT_LIST,
        payload: data
    }
}
