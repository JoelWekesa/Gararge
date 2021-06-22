import * as Types from "./types";

const initialState = {
	staff: {},
	loading: false,
	isAuthenticated: false,
	error: null,
};

export const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.AUTH_START:
			return {
				...state,
				staff: {},
				loading: true,
			};

		case Types.AUTH_SUCCESS:
			return {
				...state,
				staff: action.payload,
				loading: false,
				isAuthenticated: true,
				error: null,
			};

		case Types.AUTH_FAIL:
			return {
				...state,
				staff: {},
				loading: false,
				isAuthenticated: false,
				error: action.payload,
			};

		case Types.AUTH_LOGOUT:
			return {
				...state,
				staff: {},
				loading: false,
				isAuthenticated: false,
				error: null,
			};

		default:
			return state;
	}
};
