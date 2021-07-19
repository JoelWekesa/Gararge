const { Router } = require("express");
const { PPEs } = require("../models/PPEs");
const { AssignPPEs } = require("../models/AssignPPEs");
const jwt = require("jsonwebtoken");
const { secrets } = process.env;
const { admin } = require("../middleware/admin/check");

const router = Router();

//? Add PPE

router.post("/add", [admin], async (req, res) => {
	try {
		const { name, description, quantity } = req.body;

		const token = req.headers["x-access-token"];
		if (!name) {
			return res.status(400).json({
				message: "Please input name of PPE(s)",
			});
		}
		if (!description) {
			return res.status(400).json({
				message: "Please input description of PPE(s)",
			});
		}
		if (!quantity) {
			return res.status(400).json({
				message: "Please input number of PPE(s)",
			});
		}
		if (parseInt(quantity) <= 0 || isNaN(quantity)) {
			return res.status(400).json({
				message: "Please input valid number of PPE(s)",
			});
		}

		await jwt.verify(token, secrets, async (err, decoded) => {
			if (err) {
				return res.status(403).json({
					message: err.message,
				});
			}

			const { id } = decoded;
			await PPEs.create({
				name,
				description,
				available: quantity,
				staff: id,
			})
				.then((ppe) => {
					return res.status(200).json({
						Success: `${ppe.name} successfully added`,
						ppe,
					});
				})
				.catch((err) => {
					return res.status(400).json({
						message: err.message,
					});
				});
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
});

//? Get all PPES

router.get("/all", [admin], async (req, res) => {
	try {
		await PPEs.findAndCountAll({
			order: [["id", "DESC"]],
		})
			.then((ppes) => {
				return res.status(200).json({
					Success: "Successfully fetched all PPEs",
					ppes,
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

//? Assign PPEs

router.post("/assign/:id", [admin], async (req, res) => {
	try {
		const { id } = req.params;
		const token = req.headers["x-access-token"];
		const { staff, quantity } = req.body;

		if (isNaN(id)) {
			return res.status(400).json({
				message: "Invalid PPE id",
			});
		}
		await PPEs.findByPk(id)
			.then(async (ppe) => {
				if (!ppe) {
					return res.status(404).json({
						message: "PPE(s) with the provided ID could not be found.",
						id,
					});
				}

				if (parseInt(quantity) > parseInt(ppe.available)) {
					return res
						.status(400)
						.json({ message: "Not enough ppes to assign." });
				}

				await jwt.verify(token, secrets, async (err, decoded) => {
					if (err) {
						return res.status(403).json({
							message: err.message,
						});
					}
					const PPE = ppe["id"];
					const assigned_by = decoded["id"];

					if (parseInt(quantity) <= 0 || isNaN(quantity)) {
						return res.status(400).json({
							message: "Please select a valid quantity to assign.",
						});
					}

					if (parseInt(quantity) > parseInt(ppe.available)) {
						return res.status(400).json({
							message: "Not enough PPEs.",
						});
					}

					await AssignPPEs.create({
						staff,
						quantity,
						PPE,
						assigned_by,
					})
						.then(async () => {
							await PPEs.update(
								{
									available: (
										parseInt(ppe.available) - parseInt(quantity)
									).toString(),
								},
								{
									where: {
										id,
									},
								}
							)
								.then(() => {
									return res.status(200).json({
										Success: `${ppe.name} was successfully assigned.`,
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

//? Edit PPE 

router.put("/edit/:id", [admin], async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description, quantity } = req.body;
		await PPEs.findByPk(id)
			.then(async (ppe) => {
				if (!ppe) {
					return res.status(404).json({
						error: "Cannot find PPE(s) with the id you provided.",
					});
				}

				await ppe
					.update(
						{
							name: name ? name : ppe.name,
							description: description ? description : ppe.description,
							available: quantity
								? parseInt(ppe.available) + parseInt(quantity)
								: ppe.available,
						},
						{
							where: {
								id,
							},
						}
					)
					.then(() => {
						return res.status(200).json({
							Success: `${ppe.name} Successfully updated.`,
							ppe,
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

module.exports = router;
