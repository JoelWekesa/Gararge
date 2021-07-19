const { Router } = require("express");
const { Tools } = require("../models/Tools");
const { AssignTools } = require("../models/AssignTools");
const jwt = require("jsonwebtoken");
const { secrets } = process.env;
const { admin } = require("../middleware/admin/check");

const router = Router();

//? Get all tools

router.get("/all", [admin], async (req, res) => {
	try {
		await Tools.findAndCountAll({
			order: [["id", "DESC"]],
		})
			.then((tools) => {
				return res.status(200).json({
					Success: "Successfully fetched all tools.",
					tools,
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

//? Add tool

router.post("/add", [admin], async (req, res) => {
	const { name, description, quantity } = req.body;
	if (!name) {
		return res.status(400).json({
			message: "Please input name of the tool(s)",
		});
	}

	if (!description) {
		return res.status(400).json({
			message: "Please input description of the tool(s)",
		});
	}

	if (isNaN(quantity) || parseInt(quantity) <= 0) {
		return res.status(400).json({
			message: "Please input valid number of the tool(s)",
		});
	}

	if (!quantity) {
		return res.status(400).json({
			message: "Please input number of the tool(s)",
		});
	}

	const token = req.headers["x-access-token"];

	await jwt.verify(token, secrets, async (err, decoded) => {
		if (err) {
			return res.status(403).json({
				message: err.message,
			});
		}

		const { id } = decoded;

		await Tools.create({
			name,
			description,
			quantity,
			available: quantity,
			status: "In operation",
			staff: id,
		})
			.then((tool) => {
				return res.status(200).json({
					Success: `${tool.name} was successfully added.`,
					tool,
				});
			})
			.catch((err) => {
				return res.status(400).json({
					message: err.message,
				});
			});
	});
});

//? Assign tools

router.post("/assign/:id", [admin], async (req, res) => {
	try {
		const { id } = req.params;
		const token = req.headers["x-access-token"];
		const { staff, quantity } = req.body;

		if (isNaN(id)) {
			return res.status(400).json({
				message: "Invalid tool id",
			});
		}

		await Tools.findByPk(id)
			.then(async (tool) => {
				if (!tool) {
					return res.status(404).json({
						message: "tool(s) with the provided ID could not be found.",
						id,
					});
				}

				if (tool.status === "Deprecated") {
					return res.status(400).json({
						message: "Tool was deprecated.",
					});
				}

				await jwt.verify(token, secrets, async (err, decoded) => {
					if (err) {
						return res.status(403).json({
							message: err.message,
						});
					}
					const Tool = tool["id"];
					const assigned_by = decoded["id"];

					if (parseInt(quantity) <= 0 || isNaN(quantity)) {
						return res.status(400).json({
							message: "Please select a valid quantity to assign.",
						});
					}

					if (parseInt(quantity) > parseInt(tool.available)) {
						return res.status(400).json({
							message: "Not enough tools.",
						});
					}

					await AssignTools.create({
						staff,
						quantity,
						tool: Tool,
						assigned_by,
					})
						.then(async () => {
							await Tools.update(
								{
									available: (
										parseInt(tool.available) - parseInt(quantity)
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
										Success: `${tool.name} was successfully assigned.`,
										tool,
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

//? Edit tools

router.put("/edit/:id", [admin], async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description, quantity } = req.body;
		await Tools.findByPk(id)
			.then(async (tool) => {
				if (!tool) {
					return res.status(404).json({
						message: "Cannot find tool(s) with the id you provided.",
					});
				}

				await Tools.update(
					{
						name: name ? name : tool.name,
						description: description ? description : tool.description,
						quantity: quantity
							? parseInt(tool.quantity) + parseInt(quantity)
							: tool.quantity,
						available: quantity
							? parseInt(tool.available) + parseInt(quantity)
							: tool.available,
					},
					{
						where: {
							id,
						},
					}
				)
					.then(() => {
						return res.status(200).json({
							Success: `${tool.name} Successfully updated.`,
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

//? Deprecate tools

router.put("/deprecate/:id", [admin], async (req, res) => {
	try {
		const { id } = req.params;
		await Tools.findByPk(id)
			.then((tool) => {
				if (!tool) {
					return res.status(404).json({
						message: "Invalid tool ID",
					});
				}

				Tools.update({ status: "Deprecated" }, { where: { id } })
					.then(() => {
						return res.status(200).json({
							Success: "Tool was successfully deprecated.",
						});
					})
					.catch((err) => {
						return res.status(500).json({ message: err.message });
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

module.exports = router;
