const { Router } = require("express");
const { secrets, password_staff } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Users } = require("../models/Staff");

const router = Router();

router.post("/login", (req, res) => {
	try {
		const { username, password } = req.body;
		Users.findOne({
			where: {
				username,
			},
		})
			.then((user) => {
				if (!user) {
					return res.status(400).json({
						message:
							"We could not find a staff member with the username you provided.",
					});
				}

				const valid = bcrypt.compareSync(password, user.password);
				if (!valid) {
					return res.status(400).json({
						message: "Invalid Password.",
					});
				}

				if (password == password_staff) {
					return res.status(403).json({
						required: "Password must be changed to use this service.",
					});
				}

				const { id, admin, super_admin } = user;
				const token = jwt.sign({ id, admin, super_admin }, secrets, {
					expiresIn: 60 * 60 * 8,
				});
				return res.status(200).json({
					user,
					access_token: token,
				});
			})
			.catch((err) => {
				return res.status(500).json({
					message: err.message,
				});
			});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
});

module.exports = router