import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { rootReducer } from "./rootReducer";

const saveToLocalStorage = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem("state", serializedState);
	} catch (e) {
		console.log(e);
	}
};

const loadFromLocalStorage = () => {
	try {
		const serializedState = localStorage.getItem("state");
		if (serializedState === null) return undefined;
		return JSON.parse(serializedState);
	} catch (e) {
		return undefined;
	}
};

const persistedState = loadFromLocalStorage();

const store = createStore(
	rootReducer,
	persistedState,
	composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
