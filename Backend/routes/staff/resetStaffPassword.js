const { Router } = require("express");
var bcrypt = require("bcryptjs");
const { Users } = require("../../models/Staff");
const { password_staff } = process.env;

const router = Router();

const resetStaffPasswordAPI = router.put("/", (req, res) => {
	try {
		const { username } = req.body;
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

				Users.update(
					{
						password: bcrypt.hashSync(password_staff, 10),
					},
					{
						where: {
							username,
						},
					}
				)
					.then(() => {
						return res.status(200).json({
							success: "Staff password was successfully changed.",
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
	resetStaffPasswordAPI,
};
