import { combineReducers } from "redux";
import { loginReducer } from "./auth/reducer";

export const rootReducer = combineReducers({
	auth: loginReducer,
});
