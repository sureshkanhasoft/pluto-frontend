import { apiClient } from "../../../config/apiClient";
import { GET_NOTIFICATION_SUCCESS } from "../actiontypes";

export const getNotification = (request, pageNo=1) => {
    console.log('pageNo: ', pageNo);
    return async (dispatch) => {
        await apiClient(true).post(`/api/organization/user/get-all-notification?page=${pageNo}`,request)
        .then(response => {
            console.log('response: ', response.data);
            dispatch(getNotificationSuccess(response.data))
        }).catch(error => {
            console.log('error: ', error);
        });
    }
}

const getNotificationSuccess = data => {
    return {
        type: GET_NOTIFICATION_SUCCESS,
        payload: data
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

