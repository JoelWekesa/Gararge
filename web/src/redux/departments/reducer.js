import * as Types from "./types";

//? Get all departments

const initialState = {
	loading: false,
	departments: [],
	error: null,
};

export const departmentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.START_DEPARTMENTS:
			return {
				...state,
				loading: true,
			};
		case Types.GET_DEPARTMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				departments: action.payload,
				error: null,
			};
		case Types.GET_DEPARTMENTS_FAIL:
			return {
				...state,
				loading: false,
				departments: [],
				error: action.payload,
			};

		default:
			return state;
	}
};

//? End of all departments

//* Start add departments

const firstState = {
	loading: false,
	department: {},
	error: null,
};

export const addDepartmentReducer = (state = firstState, action) => {
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
				department: action.payload,
				error: null,
			};

		case Types.ADD_FAIL:
			return {
				...state,
				loading: false,
				department: {},
				error: action.payload,
			};

		default:
			return state;
	}
};

//* End of add departments
