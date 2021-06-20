const { Router } = require("express");
const { secrets, password_staff } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Users } = require("../models/Staff");

const router = Router();

router.post("/", (req, res) => {
	try {
		const { username, password } = req.body;
		Users.findOne({
			where: {
				username,
			},
		})
			.then((user) => {
				if (!user) {
					return res.status(404).json({
						error:
							"We could not find a staff member with the username you provided.",
					});
				}

				const valid = bcrypt.compareSync(password, user.password);
				if (!valid) {
					return res.status(400).json({
						error: "Invalid Password.",
					});
				}

				if (password == password_staff) {
					return res.status(403).json({
						required: "Password must be changed to use this service.",
					});
				}

				const { id } = user;
				const token = jwt.sign({ id: id }, secrets, {
					expiresIn: 60 * 60 * 8,
				});
				return res.status(200).json({
					user,
					access_token: token,
					isAuthenticated: true,
				});
			})
			.catch((err) => {
				return res.status(500).json({
					error: err.message,
				});
			});
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
});

module.exports = {
	loginAPI: router,
};
