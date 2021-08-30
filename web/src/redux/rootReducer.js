import { combineReducers } from "redux";
import { loginReducer } from "./auth/reducer";
import {
	departmentsReducer,
	addDepartmentReducer,
} from "./departments/reducer";
import { addStaffReducer } from "./staff/reducer";
import { passwordResetReducer } from "./auth/reducer";
import { allStaffReducer } from "./staff/reducer";
import {
	addSupplyReducer,
	allProductsReducer,
	specificProductReducer,
	editProductReducer,
} from "./supplies/reducer";
import { categoriesReducer } from "./categories/reducer";
import { washReducer, addWashReducer } from "./carwash/reducer";
import { cartReducer, saleReducer } from "./sales/reducer";

export const rootReducer = combineReducers({
	auth: loginReducer,
	departments: departmentsReducer,
	adddepartment: addDepartmentReducer,
	newstaff: addStaffReducer,
	password: passwordResetReducer,
	staff: allStaffReducer,
	newsupply: addSupplyReducer,
	categories: categoriesReducer,
	wash: washReducer,
	addwash: addWashReducer,
	supplies: allProductsReducer,
	supply: specificProductReducer,
	editsupply: editProductReducer,
	cart: cartReducer,
	sale: saleReducer,
});
