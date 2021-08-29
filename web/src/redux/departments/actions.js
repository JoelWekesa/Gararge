import axios from "axios";
import * as Types from "./types";
import { configHelper } from "../../config/helper";
import { baseUrl } from "../../config/baseUrl";

//? Get all departments

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

//? End of all departments

//* Add department

const startAdd = () => {
	return {
		type: Types.START_ADD,
	};
};

const addSuccess = (data) => {
	return {
		type: Types.ADD_SUCCESS,
		payload: data,
	};
};

const addFail = (message) => {
	return {
		type: Types.ADD_FAIL,
		payload: message,
	};
};

export const addDepartment = (department) => {
	return (dispatch, getState) => {
		dispatch(startAdd());
		const body = {
			department,
		};
		const url = `${baseUrl}/departments/add`;
		axios
			.post(url, body, configHelper(getState))
			.then((res) => {
				const { data } = res;
				dispatch(addSuccess(data));
			})
			.catch((err) => {
				const { message } = err;
				dispatch(addFail(message));
			});
	};
};

//* End of add department
