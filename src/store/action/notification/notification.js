import { apiClient } from "../../../config/apiClient";
import * as actionTypes from "../actiontypes";

export const getNotificationSuccess = data => {
    return {
        type:actionTypes.GET_NOTIFICATION_SUCCESS,
        payload: data
    }
}
export const getNotification = (request) => {
    return async (dispatch) => {
        await apiClient(true).post(`/api/organization/user/get-all-notification`,request)
        .then(response => {
            dispatch(getNotificationSuccess(response.data))
        }).catch(error => {

        });
    }
}
export const readNotification = (request) => {
    let requestData={
        notification_id:request.notification_id,
        is_read:request.is_read
    }
    return async (dispatch) => {
        await apiClient(true).post(`/api/organization/user/update-notification`,requestData)
        .then(response => {
            dispatch(getNotification({signee_id:request.signee_id}))
        }).catch(error => {

        });
    }
}

