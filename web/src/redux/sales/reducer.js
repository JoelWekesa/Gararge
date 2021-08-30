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
