import axios from "axios";
import * as Types from "./types";
import { configHelper } from "../../config/helper";
import { baseUrl } from "../../config/baseUrl";

//? Add product.

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

export const addSupply = (name, description, price, quantity, category) => {
	return (dispatch, getState) => {
		dispatch(startAdd());
		const url = `${baseUrl}/supplies/add`;
		const body = { name, description, price, quantity, category };
		axios
			.post(url, body, configHelper(getState))
			.then((res) => {
				const { data } = res;
				dispatch(addSuccess(data));
			})
			.catch((err) => {
				dispatch(addFail(err.message));
			});
	};
};

//? End of add product.
