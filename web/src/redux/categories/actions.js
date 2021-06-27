import axios from "axios";
import * as Types from "./types";
import { baseUrl } from "../../config/baseUrl";
import { configHelper } from "../../config/helper";

//? Get all categories

const startAll = () => {
	return {
		type: Types.START_ALL,
	};
};

const allSuccess = (data) => {
	return {
		type: Types.ALL_SUCCESS,
		payload: data,
	};
};

const allFail = (message) => {
	return {
		type: Types.ALL_FAIL,
		payload: message,
	};
};

export const allCategories = () => {
	return (dispatch, getState) => {
		dispatch(startAll());
		const url = `${baseUrl}/suppliescategories/all`;
		axios
			.get(url, configHelper(getState))
			.then((res) => {
				const { data } = res;
				dispatch(allSuccess(data.categories.rows));
			})
			.catch((err) => {
				const { message } = err;
				dispatch(allFail(message));
			});
	};
};

//? End
