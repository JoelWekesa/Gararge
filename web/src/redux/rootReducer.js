import { combineReducers } from "redux";
import {
	departmentsReducer,
	addDepartmentReducer,
} from "./departments/reducer";
import { addStaffReducer } from "./staff/reducer";
import {
	passwordResetReducer,
	loginReducer,
	checkTokenReducer,
} from "./auth/reducer";
import { allStaffReducer } from "./staff/reducer";
import {
	addSupplyReducer,
	allProductsReducer,
	specificProductReducer,
	editProductReducer,
} from "./supplies/reducer";
import { categoriesReducer, addCategoryReducer } from "./categories/reducer";
import { washReducer, addWashReducer, weeklyWashesReducer } from "./carwash/reducer";
import { cartReducer, saleReducer, weeklySalesReducer } from "./sales/reducer";

export const rootReducer = combineReducers({
	tokencheck: checkTokenReducer,
	auth: loginReducer,
	departments: departmentsReducer,
	adddepartment: addDepartmentReducer,
	newstaff: addStaffReducer,
	password: passwordResetReducer,
	staff: allStaffReducer,
	newsupply: addSupplyReducer,
	categories: categoriesReducer,
	addcategory: addCategoryReducer,
	wash: washReducer,
	addwash: addWashReducer,
	supplies: allProductsReducer,
	supply: specificProductReducer,
	editsupply: editProductReducer,
	cart: cartReducer,
	sale: saleReducer,
	weekly: weeklySalesReducer,
	washes: weeklyWashesReducer,
});
