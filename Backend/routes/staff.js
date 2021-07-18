const { Router } = require("express");
const dotenv = require("dotenv");
dotenv.config();
var bcrypt = require("bcryptjs");
const { Users } = require("../models/Staff");
const { Resetcodes } = require("../models/ResetCodes");
const { admin } = require("../middleware/admin/check");
const { TWILIO_TOKEN, TWILIO_ACCOUNT_SID, password_staff } = process.env;

const router = Router();
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_TOKEN);
const code = Math.floor(1000000 * Math.random()).toString(); //? Bcrypt only encrypts strings.

//? Add new staff

router.post("/add", [admin], (req, res) => {
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
				.then(async (user) => {
					await Resetcodes.create({
						user: user.id,
						code: bcrypt.hashSync(code, 10),
					})
						.then(() => {
							client.messages
								.create({
									body: `Your reset code is ${code}`,
									from: "+13372431053",
									to: `+254${user.phone_number}`,
								})
								.then(() => {
									return res
										.status(200)
										.json({
											Success: "Account successfully created.",
										})
										.catch((err) => {
											return res.status(400).json({
												message: err.message,
											});
										});
								});
						})
						.catch((err) => {
							return res.status(400).json({
								message: err.message,
							});
						});
				})
				.catch((err) => {
					return res.status(400).json({
						message: err.message,
					});
				});
		} else {
			return res.status(400).json({
				message: "Please fill all fields before adding a staff member.",
			});
		}
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
});

//? Get all staff

router.get("/all", [admin], (req, res) => {
	try {
		Users.findAndCountAll({
			order: [["id", "DESC"]],
		}).then((users, err) => {
			if (err) {
				return res.status(500).json({
					message: "Failed",
				});
			}
			return res.status(200).json({
				message: "Successfully fetched all users.",
				users,
			});
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
});

//? Remove staff member

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		if (isNaN(id)) {
			return res.status(400).json({
				message: "Invalid User ID.",
			});
		}

		await Users.findByPk(id)
			.then(async (user) => {
				if (!user) {
					return res.status(404).json({
						message: "We could not find a user with the ID you provided.",
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
							message: err.message,
						});
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

//? Reset password

router.post("/request/code", async (req, res) => {
	try {
		const { username } = req.body;
		if (!username) {
			return res.status(400).json({ message: "Please input your username." });
		}

		await Users.findOne({ where: { username } })
			.then(async (user) => {
				if (!user) {
					return res.status(404).json({ message: "Invalid username" });
				}

				await Resetcodes.create({
					user: user.id,
					code: bcrypt.hashSync(code, 10),
				})
					.then(() => {
						client.messages
							.create({
								body: `Your reset code is ${code}`,
								from: "+13372431053",
								to: `+254${user.phone_number}`,
							})
							.then(() => {
								return res
									.status(200)
									.json({
										Success: "Reset code sent successfully.",
									})
									.catch((err) => {
										return res.status(400).json({
											message: err.message,
										});
									});
							});
					})
					.catch((err) => {
						return res.status(400).json({
							message: err.message,
						});
					});
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
});

router.put("/password/reset", async (req, res) => {
	try {
		const { code, username, password } = req.body;
		if (!username) {
			return res.status(400).json({
				message: "Please input your username",
			});
		}

		if (!code) {
			return res.status(400).json({
				message: "Please input your reset code.",
			});
		}

		if (!password) {
			return res.status(400).json({
				message: "Please input your password.",
			});
		}
		await Users.findOne({
			where: {
				username,
			},
		})
			.then(async (user) => {
				if (!user) {
					return res.status(404).json({
						message: "We could not find a user with the provided username",
					});
				}

				const { id } = user;
				await Resetcodes.findOne({
					where: {
						user: id,
					},
				})
					.then((value) => {
						if (!value) {
							return res.status(404).json({
								message: "You do not have a reset code.",
							});
						}

						const valid = bcrypt.compareSync(code, value.code);
						if (!valid) {
							return res.status(403).json({
								message: "Invalid reset code",
							});
						}
						Users.update(
							{ password: bcrypt.hashSync(password, 10) },
							{
								where: {
									id,
								},
							}
						)
							.then(() => {
								Resetcodes.destroy({
									where: {
										user: id,
									},
								})
									.then(() => {
										return res.status(200).json({
											Success: "You have successfully reset your password",
										});
									})
									.catch((err) => {
										return res.status(400).json({
											message: err.message,
										});
									});
							})
							.catch((err) => {
								return res.status(400).json({
									message: err.message,
								});
							});
					})
					.catch((err) => {
						return res.status(400).json({
							message: err.message,
						});
					});
			})
			.catch((err) => {
				return res.status(400).json({
					message: err.message,
				});
			});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
});

module.exports = router; //? Exported this way as it is only one file
