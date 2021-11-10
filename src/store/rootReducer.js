import { combineReducers } from "redux";
import authReducer from "./reducer/auth/authReducer";
import browseShiftReducer from "./reducer/browseShift/browseShiftReducer";
import complianceReducer from "./reducer/compliance/complianceReducer";
import organizationReducer from "./reducer/organization/organizationReducer";
import preferenceReducer from "./reducer/preference/preferenceReducer";
import profileReducer from "./reducer/profile/profileReducer";
import switchAccReducer from "./reducer/switchAccount/switchAccReducer";
import myShiftReducer from "./reducer/myShift/myShiftReducer";
import notificationReducer from "./reducer/notification/notification";

const rootReducer = combineReducers(
    {
        authenticate: authReducer,
        organization: organizationReducer,
        profile: profileReducer,
        preference: preferenceReducer,
        browseShift: browseShiftReducer,
        addCompliance: complianceReducer,
        switchAccount: switchAccReducer,
        myShift: myShiftReducer,
        notification:notificationReducer,
    }
)

export default rootReducer;