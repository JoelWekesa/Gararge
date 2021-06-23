import axios from "axios";
import * as Types from "./types";
import { baseUrl } from "../../config/baseUrl";
import { configHelper } from "../../config/helper";

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
	department,
	staff,
	password
) => {
	return (dispatch, getState) => {
		dispatch(startStaff());
		const body = {
			first_name,
			last_name,
			username,
			national_id,
			phone_number,
			department,
			staff,
			password,
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
