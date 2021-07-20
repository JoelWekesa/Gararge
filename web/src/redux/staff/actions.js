import axios from "axios";
import * as Types from "./types";
import { baseUrl } from "../../config/baseUrl";
import { configHelper } from "../../config/helper";

//? Add staff
const startStaff = () => {
	return {
		type: Types.START_STAFF,
	};
};

const addStaff = (data) => {
	return {
		type: Types.ADD_STAFF,
		payload: data,
	};
};

const addStaffFail = (message) => {
	return {
		type: Types.ADD_STAFF_FAIL,
		payload: message,
	};
};

export const addNewStaff = (
	first_name,
	last_name,
	username,
	national_id,
	phone_number,
	email,
	department
) => {
	return (dispatch, getState) => {
		dispatch(startStaff());
		const body = {
			first_name,
			last_name,
			username,
			national_id,
			phone_number,
			email,
			department,
		};

		const url = `${baseUrl}/staff/add`;
		axios
			.post(url, body, configHelper(getState))
			.then((res) => {
				const { data } = res;
				dispatch(addStaff(data));
			})
			.catch((err) => {
				const { message } = err;
				dispatch(addStaffFail(message));
			});
	};
};

//? End of add staff

//** Get all staff */

const startAllStaff = () => {
	return {
		type: Types.START_GET,
	};
};

const allStaffSuccess = (data) => {
	return {
		type: Types.GET_SUCCESS,
		payload: data,
	};
};

const allStaffFail = (message) => {
	return {
		type: Types.GET_FAIL,
		payload: message,
	};
};

export const getAllStaff = () => {
	return (dispatch, getState) => {
		dispatch(startAllStaff());
		const url = `${baseUrl}/staff/all`;
		axios
			.get(url, configHelper(getState))
			.then((res) => {
				const { data } = res;
				dispatch(allStaffSuccess(data));
			})
			.catch((err) => {
				const { message } = err;
				dispatch(allStaffFail(message));
			});
	};
};

//** End get all staff */
