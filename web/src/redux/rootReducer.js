import { combineReducers } from "redux";
import { loginReducer } from "./auth/reducer";
import { departmentsReducer } from "./departments/reducer";
import { addStaffReducer } from "./staff/reducer";

export const rootReducer = combineReducers({
	auth: loginReducer,
	departments: departmentsReducer,
	newstaff: addStaffReducer,
});
