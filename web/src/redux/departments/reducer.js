import * as Types from "./types";

const initialState = {
	loading: false,
	departments: [],
	error: null,
};

export const departmentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.START_DEPARTMENTS:
			return {
				...state,
				loading: true,
			};
		case Types.GET_DEPARTMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				departments: action.payload,
				error: null,
			};
		case Types.GET_DEPARTMENTS_FAIL:
			return {
				...state,
				loading: false,
				departments: [],
				error: action.payload,
			};

		default:
			return state;
	}
};
