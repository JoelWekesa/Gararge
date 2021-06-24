import * as Types from "./types";

//? Login reducer
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
//? End of login reducer

//** Password reset reducer */
const startState = {
	loading: false,
	success: false,
	error: null,
};

export const passwordResetReducer = (state = startState, action) => {
	switch (action.type) {
		case Types.START_RESET:
			return {
				...state,
				loading: true,
			};

		case Types.RESET_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				error: null,
			};

		case Types.RESET_FAIL:
			return {
				...state,
				loading: false,
				success: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

//** End of password reset reducer */
