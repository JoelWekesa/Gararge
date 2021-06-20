const { Router } = require("express");
var bcrypt = require("bcryptjs");
const { Users } = require("../models/Staff");
const { password_staff } = process.env;

const router = Router();

const allStaffAPI = router.get("/", (req, res) => {
	try {
		Users.findAndCountAll({
			order: [["id", "DESC"]],
		}).then((users, err) => {
			if (err) {
				return res.status(500).json({
					error: "Failed",
				});
			}
			return res.status(200).json({
				message: "Successfully fetched all users.",
				users,
			});
		});
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
});

const addStaffAPI = router.post("/", (req, res) => {
	const {
		first_name,
		last_name,
		username,
		national_id,
		phone_number,
		department,
	} = req.body;
	try {
		if (
			first_name &&
			last_name &&
			username &&
			national_id &&
			phone_number &&
			department
		) {
			Users.create({
				first_name,
				last_name,
				username,
				national_id,
				phone_number,
				department,
				staff: true,
				password: bcrypt.hashSync(password_staff, 10),
			})
				.then((user) => {
					return res.status(200).json({
						message: "Staff successfully added.",
						user,
					});
				})
				.catch((err) => {
					return res.status(400).json({
						error: err.message,
					});
				});
		} else {
			return res.status(400).json({
				error: "Please fill all fields before adding a staff member.",
			});
		}
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
});

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

const removeStaffAPI = router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		if (isNaN(id)) {
			return res.status(400).json({
				error: "Invalid User ID.",
			});
		}

		await Users.findByPk(id)
			.then(async (user) => {
				if (!user) {
					return res.status(404).json({
						error: "We could not find a user with the ID you provided.",
					});
				}

				await Users.destroy({
					where: {
						id,
					},
				})
					.then(() => {
						return res.status(200).json({
							Success: "Staff was successfully deleted.",
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
	addStaffAPI,
	staffPasswordAPI,
	removeStaffAPI,
	allStaffAPI,
};
