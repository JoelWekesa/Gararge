import * as Types from "./types";

export const addToCart = (item) => {
	return {
		type: Types.ADD_TO_CART,
		payload: item,
	};
};

export const adjustQTY = (item) => {
	return {
		type: Types.ADJUST_QUANTITY,
		payload: item
	};
};

export const removeFromCart = (item) => {
	return {
		type: Types.REMOVE_FROM_CART,
		payload: item,
	};
};

export const clearCart = () => {
	return {
		type: Types.CLEAR_CART,
	};
};
