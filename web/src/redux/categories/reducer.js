import * as Types from "./types";

//? All categories

const initialState = {
	loading: false,
	error: null,
	categories: [],
};

export const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.START_ALL:
			return {
				...state,
				loading: true,
			};

		case Types.ALL_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				categories: action.payload,
			};

		case Types.ALL_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
				categories: [],
			};

		default:
			return state;
	}
};
