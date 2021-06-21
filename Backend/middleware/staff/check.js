const { secrets } = process.env;
const jwt = require("jsonwebtoken");

const staff = async (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (!token) {
			return res.status(403).json({
				error: "No access token provided!",
			});
		}
		jwt.verify(token, secrets, (err, decoded) => {
			if (err) {
				return res.status(403).json({
					error: err.message,
				});
			}

			next();
		});
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
};

module.exports = {
	staff,
};
