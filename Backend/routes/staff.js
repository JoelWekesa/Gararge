const { Router } = require("express");
const dotenv = require("dotenv");
dotenv.config();
var bcrypt = require("bcryptjs");
const { Users } = require("../models/Staff");
const { Resetcodes } = require("../models/ResetCodes");
const { admin } = require("../middleware/admin/check");
const nodemailer = require("nodemailer");
const { secrets } = process.env;
const jwt = require("jsonwebtoken");

const router = Router();

/**Check if user is authenticated */

router.get("/check", async (req, res) => {
	try {

		const token = req.headers["x-access-token"];
		if (!token) {
			return res.status(403).json({ message: "No access token provided" });
		}

		jwt.verify(token, secrets, (err, decoded) => {
			if (err) {
				return res.status(403).json({ message: err.message })
			}

			return res.status(200).json({ message: decoded})
		})
		
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	
})

/**End of check for authenticated*/

//? Add new staff

router.post("/add", [admin], (req, res) => {
	const {
		first_name,
		last_name,
		username,
		national_id,
		phone_number,
		email,
		department,
	} = req.body;
	try {
		if (
			first_name &&
			last_name &&
			username &&
			national_id &&
			phone_number &&
			department &&
			email
		) {
			const generator = Math.floor(100000 + Math.random() * 900000); //Generate 6 random numbers
			Users.create({
				first_name,
				last_name,
				username,
				national_id,
				phone_number,
				email,
				department,
				staff: true,
				password: bcrypt.hashSync((generator * Math.random()).toString(), 10),
			})
				.then(async (user) => {
					return res.status(200).json({user})
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

				if (!user.admin || !user.super_admin) {
					return res.status(403).json({ message: "Unauthorized" });
				}

				await Resetcodes.destroy({ where: { user: user.id } })
					.then(async () => {
						const generator = Math.floor(100000 + Math.random() * 900000); //Generate 6 random numbers

						await Resetcodes.create({
							user: user.id,
							code: bcrypt.hashSync(generator.toString(), 10),
						})
							.then(async () => {
								//**Ref link to node mailer: https://nodemailer.com/about/ */
								const transporter = nodemailer.createTransport({
									service: "gmail",
									auth: {
										user: process.env.EMAIL,
										pass: process.env.EMAIL_PASS,
									},
								});

								// send mail with defined transport object
								await transporter.sendMail(
									{
										from: '"Auto Top Garage" <support@autotop.co.ke>',
										to: `${user.email}`,
										subject: "Password Reset",
										html: `<b style = "text-transform: capitalize"> <p>Hi ${user.first_name}, </p> <p>Your reset code is ${generator}</P></b>`, // html body
									},
									(err, data) => {
										if (err) {
											return res.status(500).json({
												error: err.message,
											});
										}

										return res.status(200).json({
											Success: "Email sent successfully.",
											data,
										});
									}
								);
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
