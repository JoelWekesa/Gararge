const { secrets } = process.env;
const jwt = require("jsonwebtoken");

const superAdmin = async (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (!token) {
			return res.status(403).json({
				message: "No access token provided!",
			});
		}
		await jwt.verify(token, secrets, (err, decoded) => {
			if (err) {
				return res.status(403).json({
					message: err.message,
				});
			}

			const { super_admin } = decoded;
			if (!super_admin) {
				return res.status(403).json({
					message: "You are not authorized to perform this action.",
				});
			}
			next();
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = {
	superAdmin,
};
