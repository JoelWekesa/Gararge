const { Users } = require("../models/Staff");
const { secrets } = process.env;
const jwt = require("jsonwebtoken");

const admin = async (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (!token) {
			return res.status(403).json({
				error: "No access token provided!",
			});
		}
		await jwt.verify(token, secrets, async (err, decoded) => {
			if (err) {
				return res.status(403).json({
					error: err.message,
				});
			}

			const { id } = decoded;
			await Users.findByPk(id)
				.then((user) => {
					if (user.admin || user.super_admin) {
						next();
					} else {
						return res.status(403).json({
							error: "You are not authorized to perform this action.",
						});
					}
				})
				.catch((err) => {
					return res.status(403).json({
						error: err.message,
					});
				});
		});
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
};

const superAdmin = async (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (!token) {
			return res.status(403).json({
				error: "No access token provided!",
			});
		}
		await jwt.verify(token, secrets, async (err, decoded) => {
			if (err) {
				return res.status(403).json({
					error: err.message,
				});
			}

			const { id } = decoded;
			await Users.findByPk(id)
				.then((user) => {
					if (!user.super_admin) {
						return res.status(403).json({
							error: "You are not authorized to perform this action.",
						});
					}

					next();
				})
				.catch((err) => {
					return res.status(403).json({
						error: err.message,
					});
				});
		});
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
};

module.exports = {
	admin,
	superAdmin,
};
