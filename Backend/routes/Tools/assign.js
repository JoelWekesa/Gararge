const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { AssignTools } = require("../../models/AssignTools");
const { Tools } = require("../../models/Tools");
const { secrets } = process.env;

const router = Router();

const assignToolsAPI = router.post("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const token = req.headers["x-access-token"];
		const { staff, quantity } = req.body;

		if (isNaN(id)) {
			return res.status(400).json({
				error: "Invalid tool id",
			});
		}
		await Tools.findByPk(id)
			.then(async (tool) => {
				if (!tool) {
					return res.status(404).json({
						error: "tool(s) with the provided ID could not be found.",
						id,
					});
				}

				await jwt.verify(token, secrets, async (err, decoded) => {
					if (err) {
						return res.status(403).json({
							error: err.message,
						});
					}
					const Tool = tool["id"];
					const assigned_by = decoded["id"];

					if (parseInt(quantity) <= 0 || isNaN(quantity)) {
						return res.status(400).json({
							error: "Please select a valid quantity to assign.",
						});
					}

					if (parseInt(quantity) > parseInt(tool.available)) {
						return res.status(400).json({
							error: "Not enough tools.",
						});
					}

					await AssignTools.create({
						staff,
						quantity,
						tool: Tool,
						assigned_by,
					})
						.then(async () => {
							await tool
								.update(
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
										error: err.message,
									});
								});
						})
						.catch((err) => {
							return res.status(400).json({
								error: err.message,
							});
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
	assignToolsAPI,
};
