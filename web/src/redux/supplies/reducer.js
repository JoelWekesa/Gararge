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

//! All products

const startState = {
	loading: false,
	products: [],
	error: null,
}

export const allProductsReducer = (state = startState, action) => {
	switch(action.type) {
		case Types.START_GET: return { 
			...state,
			loading: true
		}

		case Types.GET_SUCCESS: return {
			...state,
			loading: false,
			products: action.payload,
			error: null,
		}

		case Types.GET_FAIL: return {
			...state,
			loading: false,
			products: [],
			error: action.payload,
		}

		default: return state
	}
}

//! End of all products.

//* Get specific product

const firstState = {
	loading: false,
	product: {},
	error: null,
};


export const specificProductReducer = (state=firstState, action) => {
	switch(action.type) {
		case Types.START_SPECIFIC : return {
			...state,
			loading: true,
		}

		case Types.SPECIFIC_SUCCESS : return {
			...state,
			loading: false,
			product: action.payload,
			error: null,
		}

		case Types.SPECIFIC_FAIL : return {
			...state,
			loading: false,
			product: {},
			error: action.payload
		}

		default: return state
	}
}

//* End of specific product

// Edit product

const alphaState = {
	loading: false,
	product: {},
	error: null,
};

export const editProductReducer = (state = alphaState, action) => {
	switch (action.type) {
		case Types.START_EDIT:
			return {
				...state,
				loading: true,
			};

		case Types.EDIT_SUCCESS:
			return {
				...state,
				loading: false,
				product: action.payload,
				error: null,
			};

		case Types.EDIT_FAIL:
			return {
				...state,
				loading: false,
				product: {},
				error: action.payload,
			};

		default:
			return state;
	}
};


// End of edit product

