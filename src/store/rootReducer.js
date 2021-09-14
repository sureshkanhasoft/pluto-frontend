import { combineReducers } from "redux";
import authReducer from "./reducer/auth/authReducer";
import organizationReducer from "./reducer/organization/organizationReducer";
import preferenceReducer from "./reducer/preference/preferenceReducer";
import profileReducer from "./reducer/profile/profileReducer";

const rootReducer = combineReducers (
    {
        authenticate:authReducer,
        organization: organizationReducer,
        profile: profileReducer,
        preference:preferenceReducer
    }
)

export default rootReducer;