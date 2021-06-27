import * as Types from "./types";

//? Add product.

const initialState = {
	loading: false,
	supply: {},
	error: null,
};

export const addSupplyReducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.START_ADD:
			return {
				...state,
				loading: true,
			};

		case Types.ADD_SUCCESS:
			return {
				...state,
				loading: false,
				supply: action.payload,
				error: null,
			};

		case Types.ADD_FAIL:
			return {
				...state,
				loading: false,
				supply: {},
				error: action.payload,
			};

		default:
			return state;
	}
};

//? End of add product.
