import { combineReducers } from "redux";
import authReducer from "./reducer/auth/authReducer";

const rootReducer = combineReducers (
    {
        authenticate:authReducer
    }
)

export default rootReducer;