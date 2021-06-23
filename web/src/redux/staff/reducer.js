import * as Types from "./types";

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
