import * as Types from "./types";

//? Add to cart

const initialState = {
	cart: [],
};

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.ADD_TO_CART:
			const supply = action.payload;
			const inCart = state.cart.find((item) => {
				if (item.id === supply.id) {
					return true;
				}

				return false;
			});
			return {
				...state,
				cart: inCart
					? state.cart.map((item) =>
							item.id === supply.id ? { ...item, qty: item.qty + 1 } : item
					  )
					: [...state.cart, { ...supply, qty: 1 }],
			};

		case Types.ADJUST_QUANTITY:
			return {
				...state,
				cart: state.cart.map((item) =>
					item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
				),
			};

		case Types.REMOVE_FROM_CART:
			return {
				...state,
				cart: state.cart.filter((item) => item.id !== action.payload.id),
			};

		case Types.CLEAR_CART:
			return {
				...state,
				cart: [],
			};

		default:
			return state;
	}
};

//? End of add to cart

//* Make a new sale

const firstState = {
	loading: false,
	sale: {},
	error: null,
};

export const saleReducer = (state = firstState, action) => {
	switch (action.type) {
		case Types.START_SALE:
			return {
				...state,
				loading: true,
			};

		case Types.SALE_SUCCESS:
			return {
				...state,
				loading: false,
				sale: action.payload,
				error: null,
			};

		case Types.SALE_FAIL:
			return {
				...state,
				loading: false,
				sale: {},
				error: action.payload,
			};

		default:
			return state;
	}
};

//* End of make a new sale

/** Start of get weekly sales */

const alphaState = {
	loading: false,
	amount: 0,
	error: null,
};

export const weeklySalesReducer = (state = alphaState, action) => {
	switch (action.type) {
		case Types.START_WEEKLY:
			return {
				...state,
				loading: true,
			};

		case Types.WEEKLY_SUCCESS:
			return {
				...state,
				loading: false,
				amount: action.payload,
				error: null,
			};

		case Types.WEEKLY_FAIL:
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
