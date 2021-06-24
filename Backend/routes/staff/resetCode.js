const { Router } = require("express");
const { Resetcodes } = require("../../models/ResetCodes");
const { Users } = require("../../models/Staff");
const bcrypt = require("bcryptjs");

const router = Router();

const allCodesAPI = router.get("/", (req, res) => {
	try {
		Resetcodes.findAndCountAll().then((codes) => {
			return res.status(200).json({
				Success: "Fetched all codes",
				codes,
			});
		});
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
});

const initialReset = router.put("/", async (req, res) => {
	try {
		const { code, username, password } = req.body;
		if (!username) {
			return res.status(400).json({
				error: "Please input your username",
			});
		}

		if (!code) {
			return res.status(400).json({
				error: "Please input your reset code.",
			});
		}

		if (!password) {
			return res.status(400).json({
				error: "Please input your password.",
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
						error: "We could not find a user with the provided username",
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
								error: "You do not have a reset code.",
							});
						}

						const valid = bcrypt.compareSync(code, value.code);
						if (!valid) {
							return res.status(403).json({
								error: "Invalid reset code",
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
											error: err.message,
										});
									});
							})
							.catch((err) => {
								return res.status(400).json({
									error: err.message,
								});
							});
					})
					.catch((err) => {
						return res.status(400).json({
							error: err.message,
						});
					});
			})
			.catch((err) => {
				return res.status(400).json({
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
	allCodesAPI,
	initialReset,
};
