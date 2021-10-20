import { apiClient } from "../../../config/apiClient"
import history from "../../../utils/HistoryUtils"
import {
    SWITCH_ACCOUNT_ERROR, SWITCH_ACCOUNT_REQUEST, SWITCH_ACCOUNT_SUCCESS
} from "../actiontypes"


export const switchAccount = (id) => {
    return async (dispatch) => {
        dispatch(switchAccountRequest())
        await apiClient(true).post(`api/signee/multi-org-login?organization_id=${id}`)
            .then(response => {
                const data = response.data
                if (data.status === true) {
                    dispatch(switchAccountSuccess(data))
                    localStorage.setItem('signeeInfo', JSON.stringify(data.data));
                    localStorage.setItem('token', JSON.stringify(data.data.token));
                    if (data.data.status === "COMPLIANT") {
                        setTimeout(() => {
                            history.push('/shifts')
                            window.location.reload()
                        }, 2000);
                    } else {
                        setTimeout(() => {
                            history.push('/profile/documents')
                            window.location.reload()
                        }, 2000);
                    }
                } else {
                    dispatch(switchAccountError(data))
                }
            }).catch(error => {
                dispatch(switchAccountError(error))
            })
    }
}

export const switchAccountRequest = () => {
    return {
        type: SWITCH_ACCOUNT_REQUEST
    }
}
export const switchAccountSuccess = (data) => {
    return {
        type: SWITCH_ACCOUNT_SUCCESS,
        payload: data
    }
}
export const switchAccountError = (error) => {
    return {
        type: SWITCH_ACCOUNT_ERROR,
        payload: error
    }
}