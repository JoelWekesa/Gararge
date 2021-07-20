import { combineReducers } from "redux";
import { loginReducer } from "./auth/reducer";
import { departmentsReducer } from "./departments/reducer";
import { addStaffReducer } from "./staff/reducer";
import { passwordResetReducer } from "./auth/reducer";
import { allStaffReducer } from "./staff/reducer";
import { addSupplyReducer } from "./supplies/reducer";
import { categoriesReducer } from "./categories/reducer";
import { washReducer, addWashReducer } from "./carwash/reducer";

export const rootReducer = combineReducers({
	auth: loginReducer,
	departments: departmentsReducer,
	newstaff: addStaffReducer,
	password: passwordResetReducer,
	staff: allStaffReducer,
	newsupply: addSupplyReducer,
	categories: categoriesReducer,
	wash: washReducer,
	addwash: addWashReducer,
});
