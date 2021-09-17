import * as Types from "./types";

//? Get all wash prices

const initialState = {
	prices: [],
	error: null,
};

export const washReducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.GET_ALL_PRICES:
			return {
				...state,
				prices: action.payload,
				error: null,
			};
		case Types.GET_ALL_PRICES_FAILURE:
			return {
				...state,
				prices: [],
				error: action.payload,
			};

		default:
			return state;
	}
};

//? Add wash record

const startState = {
	loading: false,
	added: {},
	error: null,
};

export const addWashReducer = (state = startState, action) => {
	switch (action.type) {
		case Types.START_WASH:
			return {
				...state,
				loading: true,
			};

		case Types.WASH_SUCCESS:
			return {
				...state,
				loading: false,
				added: action.payload,
				error: null,
			};

		case Types.WASH_FAILURE:
			return {
				...state,
				loading: false,
				added: {},
				error: action.payload,
			};

		default:
			return state;
	}
};


/** Start of get weekly sales */

const alphaState = {
	loading: false,
	amount: 0,
	error: null,
};

export const weeklyWashesReducer = (state = alphaState, action) => {
	switch (action.type) {
		case Types.START_WEEKLY_WASHES:
			return {
				...state,
				loading: true,
			};

		case Types.WEEKLY_WASH_SUCCESS:
			return {
				...state,
				loading: false,
				amount: action.payload,
				error: null,
			};

		case Types.WEEKLY_WASH_FAIL:
			return {
				...state,
				loading: false,
				amount: 0,
				error: action.payload,
			};

		default:
			return state;
	}
};

/** End of get weekly sales */
