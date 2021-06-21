const { Router } = require("express");
var bcrypt = require("bcryptjs");
const { Users } = require("../../models/Staff");
const { password_staff } = process.env;

const router = Router();

const staffPasswordAPI = router.put("/", (req, res) => {
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
				const valid = bcrypt.compareSync(password_staff, user.password);
				if (!valid) {
					return res.status(400).json({
						error: "Default password was already changed.",
					});
				}
				Users.update(
					{
						password: bcrypt.hashSync(password, 10),
					},
					{
						where: {
							username,
						},
					}
				)
					.then(() => {
						return res.status(200).json({
							success: "Default password was successfully changed.",
						});
					})
					.catch((err) => {
						return res.status(500).json({
							error: err.message,
						});
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
	staffPasswordAPI,
};
