import axios from "axios";
import * as Types from "./types";
import { baseUrl } from "../../config/baseUrl";
import { configHelper } from "../../config/helper";

//? Login
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
//? End of login

//! Logout
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
//! End of logout

// Password reset
const startReset = () => {
	return {
		type: Types.START_RESET,
	};
};

const resetSuccess = () => {
	return {
		type: Types.RESET_SUCCESS,
	};
};

const resetFail = (message) => {
	return {
		type: Types.RESET_FAIL,
		payload: message,
	};
};

// End of password reset

//** Login dispatch */
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
//**End of login dispatch */

//! Logout dispatch
export const userLogout = () => {
	return (dispatch) => {
		dispatch(authLogout());
	};
};
//! End of logout dispatch

//? Reset dispatch
export const passwordReset = (username) => {
	return (dispatch, getState) => {
		dispatch(startReset());
		const url = `${baseUrl}/password/reset`;
		const body = {
			username,
		};
		axios
			.put(url, body, configHelper(getState))
			.then(() => {
				dispatch(resetSuccess());
			})
			.catch((err) => {
				dispatch(resetFail(err.message));
			});
	};
};
//? End of reset dispatch
