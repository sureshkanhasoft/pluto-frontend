import * as actionTypes from "./actiontypes";

const error_something_wrong = 'Something Went Wrong!';

// notification Fail
export const notificationFail = err => {
    let msg = error_something_wrong;
    if (!err.status) {
        msg = err.message
    }
    return {
        type: actionTypes.ADD_NEW_NOTIFICATION_FAIL,
        state: msg
    };
};

// notification Success
export const notificationSuccess = msg => {
    return {
        type: actionTypes.ADD_NEW_NOTIFICATION_SUCCESS,
        state: msg
    };
};
