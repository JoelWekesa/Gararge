import * as Types from "./types";
import axios from "axios";
import { configHelper } from "../../config/helper";
import { baseUrl } from "../../config/baseUrl";

//? Add to cart

export const addToCart = (item) => {
	return {
		type: Types.ADD_TO_CART,
		payload: item,
	};
};

export const adjustQTY = (item) => {
	return {
		type: Types.ADJUST_QUANTITY,
		payload: item,
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

//? End of add to cart

//* Make a sale

const startSale = () => {
	return {
		type: Types.START_SALE,
	};
};

const saleSuccess = (data) => {
	return {
		type: Types.START_SALE,
		payload: data,
	};
};

const saleFail = (error) => {
	return {
		type: Types.SALE_FAIL,
		payload: error,
	};
};

export const newSale = (quantity, price, id) => {
	return (dispatch, getState) => {
		dispatch(startSale());
		const url = `${baseUrl}/sales/add/${id}`;
		const body = {
			quantity,
			price,
		};

		axios
			.post(url, body, configHelper(getState))
			.then((res) => {
				const { data } = res;
				dispatch(saleSuccess(data));
			})
			.catch((err) => {
				const { message } = err;
				dispatch(saleFail(message));
			});
	};
};

//* End of make a sale
