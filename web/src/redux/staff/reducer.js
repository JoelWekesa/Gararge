import * as Types from "./types";

//? Add staff

const initialState = {
	loading: false,
	staff: {},
	error: null,
};

export const addStaffReducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.START_STAFF:
			return {
				...state,
				loading: true,
			};

		case Types.ADD_STAFF:
			return {
				...state,
				loading: false,
				staff: action.payload,
				error: null,
			};
		case Types.ADD_STAFF_FAIL:
			return {
				...state,
				loading: false,
				staff: {},
				error: action.payload,
			};

		default:
			return state;
	}
};

//? End of add staff

//** All staff */

const startState = {
	loading: false,
	users: [],
	error: null,
};

export const allStaffReducer = (state = startState, action) => {
	switch (action.type) {
		case Types.START_GET:
			return {
				...state,
				loading: true,
			};

		case Types.GET_SUCCESS:
			return {
				...state,
				loading: false,
				users: action.payload,
				error: null,
			};

		case Types.GET_FAIL:
			return {
				...state,
				loading: false,
				users: [],
				error: action.payload,
			};

		default:
			return state;
	}
};

//** End all staff */
