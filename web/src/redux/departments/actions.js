import axios from "axios";
import * as Types from "./types";
import { configHelper } from "../../config/helper";
import { baseUrl } from "../../config/baseUrl";

const startDepartments = () => {
	return {
		type: Types.START_DEPARTMENTS,
	};
};

const getDepartments = (data) => {
	return {
		type: Types.GET_DEPARTMENTS_SUCCESS,
		payload: data,
	};
};

const getDepartmentsFail = (message) => {
	return {
		type: Types.GET_DEPARTMENTS_FAIL,
		payload: message,
	};
};

export const allDepartments = () => {
	return (dispatch, getState) => {
		dispatch(startDepartments());
		const url = `${baseUrl}/departments/all`;
		axios
			.get(url, configHelper(getState))
			.then((res) => {
				const { data } = res;
				dispatch(getDepartments(data));
			})
			.catch((err) => {
				const { message } = err;
				dispatch(getDepartmentsFail(message));
			});
	};
};
