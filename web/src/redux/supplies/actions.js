import axios from "axios";
import * as Types from "./types";
import { configHelper } from "../../config/helper";
import { baseUrl } from "../../config/baseUrl";

//? Add product.

const startAdd = () => {
	return {
		type: Types.START_ADD,
	};
};

const addSuccess = (data) => {
	return {
		type: Types.ADD_SUCCESS,
		payload: data,
	};
};

const addFail = (message) => {
	return {
		type: Types.ADD_FAIL,
		payload: message,
	};
};

export const addSupply = (name, description, price, selling_price, quantity, category) => {
	return (dispatch, getState) => {
		dispatch(startAdd());
		const url = `${baseUrl}/supplies/add`;
		const body = { name, description, price, selling_price, quantity, category };
		axios
			.post(url, body, configHelper(getState))
			.then((res) => {
				const { data } = res;
				dispatch(addSuccess(data));
			})
			.catch((err) => {
				dispatch(addFail(err.message));
			});
	};
};

//? End of add product.

//! Get all products.

const startGet = () => {
	return {
		type: Types.START_GET,
	};
};

const getSuccess = (data) => {
	return {
		type: Types.GET_SUCCESS,
		payload: data,
	};
};

const getFail = (message) => {
	return {
		type: Types.GET_FAIL,
		payload: message,
	};
};

export const getAllSupplies = () => {
	return (dispatch, getState) => {
		dispatch(startGet());
		const url = `${baseUrl}/supplies/all`;
		axios
			.get(url, configHelper(getState))
			.then((res) => {
				const { data } = res;
				dispatch(getSuccess(data));
			})
			.catch((err) => {
				const { message } = err;
				dispatch(getFail(message));
			});
	};
};

//* Get specific supply

const startSpecific = () => {
	return {
		type: Types.START_SPECIFIC,
	};
};

const specificSuccess = (data) => {
	return {
		type: Types.SPECIFIC_SUCCESS,
		payload: data,
	};
};

const specificFail = (message) => {
	return {
		type: Types.SPECIFIC_FAIL,
		payload: message,
	};
};

export const specificSupply = (id) => {
	return (dispatch, getState) => {
		dispatch(startSpecific());
		const url = `${baseUrl}/supplies/supply/${id}`;
		axios
			.get(url)
			.then((res) => {
				const { data } = res;
				dispatch(specificSuccess(data));
			})
			.catch((err) => {
				const { message } = err;
				dispatch(specificFail(message));
			});
	};
};

//* End of specific supply


// Edit supply

const startEdit = () => {
	return {
		type: Types.START_EDIT
	}
}

const editSuccess = (data) => {
	return {
		type: Types.EDIT_SUCCESS,
		payload: data
	}
}

const editFail = (message) => {
	return { 
		type: Types.EDIT_FAIL,
		payload: message
	}
}


export const editSupply = (supply) => {
	return (dispatch, getState) => {
		dispatch(startEdit());
		const url = `${baseUrl}/supplies/edit/${supply.id}`;
		const body = {
			description: supply.description,
			selling_price: supply.selling_price,
			quantity: supply.quantity,
		};

		axios.put(url, body, configHelper(getState)).then(res => {
			const {data} = res;
			dispatch(editSuccess(data));
		}).catch(err => {
			const { message } = err;
			dispatch(editFail(message));
		})
	}
}

// End of edit data