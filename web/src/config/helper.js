export const configHelper = (getState) => {
	const { access_token } = getState().auth.staff;
	let config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	if (access_token) {
		config.headers["x-access-token"] = `${access_token}`;
	}

	return config;
};
