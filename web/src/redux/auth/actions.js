import axios from "axios";
import * as Types from "./types";
import { baseUrl } from "../../config/baseUrl";

const authStart = () => {
	return {
		type: Types.AUTH_START,
	};
};

const authSuccess = (data) => {
	return {
		type: Types.AUTH_SUCCESS,
		payload: data,
	};
};

const authFail = (message) => {
	return {
		type: Types.AUTH_FAIL,
		payload: message,
	};
};

const authLogout = () => {
	return {
		type: Types.AUTH_LOGOUT,
	};
};

const checkAuth = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(authLogout());
		}, expirationTime * 8);
	};
};

export const userLogin = (username, password) => {
	return (dispatch) => {
		dispatch(authStart());
		const body = { username, password };
		const url = `${baseUrl}/auth/login`;
		axios
			.post(url, body)
			.then((res) => {
				const { data } = res;
				dispatch(authSuccess(data));
				dispatch(checkAuth(1000 * 3600));
			})
			.catch((err) => {
				const { message } = err;
				dispatch(authFail(message));
			});
	};
};

export const userLogout = () => {
	return (dispatch) => {
		dispatch(authLogout());
	};
};
