const { secrets } = process.env;
const jwt = require("jsonwebtoken");

const admin = async (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (!token) {
			return res.status(403).json({
				message: "No access token provided!",
			});
		}
		await jwt.verify(token, secrets, async (err, decoded) => {
			if (err) {
				return res.status(403).json({
					message: err.message,
				});
			}

			const { admin, super_admin } = decoded;
			if (admin || super_admin) {
				next();
			} else {
				return res.status(403).json({
					message: "You are not authorized to perform this action.",
				});
			}
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = {
	admin,
};
