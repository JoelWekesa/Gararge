import * as Types from "./types";
import axios from "axios";
import { baseUrl } from "../../config/baseUrl";
import { configHelper } from "../../config/helper";

//? Get all prices and types

const getAllPrices = (data) => {
	return {
		type: Types.GET_ALL_PRICES,
		payload: data,
	};
};

const getAllPricesFail = (message) => {
	return {
		type: Types.GET_ALL_PRICES_FAILURE,
		payload: message,
	};
};

export const washPrices = () => {
	return (dispatch, getState) => {
		const url = `${baseUrl}/carwashprices/all`;
		axios
			.get(url, configHelper(getState))
			.then((res) => {
				const { data } = res;
				const { rows } = data.prices;
				console.log(rows);
				dispatch(getAllPrices(rows));
			})
			.catch((err) => {
				const { message } = err;
				dispatch(getAllPricesFail(message));
			});
	};
};

//? Add carwash records

const startWash = () => {
	return {
		type: Types.START_WASH,
	};
};

const addWash = (data) => {
	return {
		type: Types.WASH_SUCCESS,
		payload: data,
	};
};

const addWashFail = (message) => {
	return {
		type: Types.WASH_FAILURE,
		payload: message,
	};
};

export const addWashRecord = (type, plates, staff) => {
	return (dispatch, getState) => {
		dispatch(startWash());
		const body = {
			staff,
			type,
			plates,
		};

		const url = `${baseUrl}/carwashes/add`;
		axios
			.post(url, body, configHelper(getState))
			.then((res) => {
				dispatch(addWash(res.data));
			})
			.catch((err) => {
				dispatch(addWashFail(err.message));
			});
	};
};

/** Start of Weekly washes */

export const startWeekly = () => {
	return {
		type: Types.START_WEEKLY_WASHES,
	};
};

export const weeklySuccess = (data) => {
	return {
		type: Types.WEEKLY_WASH_SUCCESS,
		payload: data,
	};
};

export const weeklyFailure = (message) => {
	return {
		type: Types.WEEKLY_WASH_FAIL,
		payload: message,
	};
};

export const getWeeklyWashes = () => {
	return (dispatch, getState) => {
		dispatch(startWeekly());
		const url = `${baseUrl}/carwashes/weekly`;
		axios
			.get(url, configHelper(getState))
			.then((res) => {
				const { data } = res;
				console.log(data);
				dispatch(weeklySuccess(data));
			})
			.catch((err) => {
				const { message } = err;
				dispatch(weeklyFailure(message));
			});
	};
};

/** End of weekly sales */