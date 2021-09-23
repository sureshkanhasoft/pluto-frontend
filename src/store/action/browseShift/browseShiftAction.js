import { apiClient } from "../../../config/apiClient";
import { 
    FILTER_SHIFT_ERROR,
    FILTER_SHIFT_REQUEST,
    FILTER_SHIFT_SUCCESS,
    GET_FILTER_SPECIALITY_ERROR,
    GET_FILTER_SPECIALITY_REQUEST,
    GET_FILTER_SPECIALITY_SUCCESS,
    GET_HOSPITAL_ERROR,
    GET_HOSPITAL_REQUEST,
    GET_HOSPITAL_SUCCESS,
    GET_SHIFT_DETAIL_ERROR, GET_SHIFT_DETAIL_REQUEST, GET_SHIFT_DETAIL_SUCCESS, 
    GET_SHIFT_ERROR, GET_SHIFT_REQUEST, GET_SHIFT_SUCCESS 
} from "../actiontypes";

export const getShift = (pageNo=1) => {
    return async (dispatch) => {
        dispatch(getShiftRequest())
        await apiClient(true).get(`api/signee/shift-list?page=${pageNo}`)
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

// ------------------------------------------

export const getHospital = () => {
    return async (dispatch) => {
        dispatch(getHospitalRequest())
        await apiClient(true).get(`api/signee/show-all-hospital`)
        .then(response => {
            console.log('response: ', response.data);
            const dataItem = response.data;
            dispatch(getHospitalSuccess(dataItem))
        }).catch(error => {
            dispatch(getHospitalSuccess(""))
            dispatch(getHospitalFailure(error))
        });
    }

}

export const getHospitalRequest = () => {
    return {
        type: GET_HOSPITAL_REQUEST
    }
}

export const getHospitalSuccess = data => {
    return {
        type: GET_HOSPITAL_SUCCESS,
        payload: data
    }
}

export const getHospitalFailure = error => {
    return {
        type: GET_HOSPITAL_ERROR,
        payload: error
    }
}


// ----------------------------------

export const getfilterSpeciality = () => {
    return async (dispatch) => {
        dispatch(getfilterSpecialityRequest())
        await apiClient(true).get(`api/signee/show-all-speciality`)
        .then(response => {
            const dataItem = response.data;
            dispatch(getfilterSpecialitySuccess(dataItem))
        }).catch(error => {
            dispatch(getfilterSpecialitySuccess(""))
            dispatch(getfilterSpecialityFailure(error))
        });
    }

}

export const getfilterSpecialityRequest = () => {
    return {
        type: GET_FILTER_SPECIALITY_REQUEST
    }
}

export const getfilterSpecialitySuccess = data => {
    return {
        type: GET_FILTER_SPECIALITY_SUCCESS,
        payload: data
    }
}

export const getfilterSpecialityFailure = error => {
    return {
        type: GET_FILTER_SPECIALITY_ERROR,
        payload: error
    }
}



// ----------------------------------------------------


export const filterShiftList = (data) => {
    return async (dispatch) => {
        dispatch(filterShiftListRequest())
        await apiClient(true).put(`api/signee/filter-shift`, data)
        .then(response => {
            const dataItem = response.data;
            dispatch(filterShiftListSuccess(dataItem))
        }).catch(error => {
            dispatch(filterShiftListSuccess(""))
            dispatch(filterShiftListFailure(error))
        });
    }

}

export const filterShiftListRequest = () => {
    return {
        type: FILTER_SHIFT_REQUEST
    }
}

export const filterShiftListSuccess = data => {
    return {
        type: FILTER_SHIFT_SUCCESS,
        payload: data
    }
}

export const filterShiftListFailure = error => {
    return {
        type: FILTER_SHIFT_ERROR,
        payload: error
    }
}