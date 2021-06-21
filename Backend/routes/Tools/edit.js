const { Router } = require("express");
const { Tools } = require("../../models/Tools");

const router = Router();

const editToolsAPI = router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description, quantity } = req.body;
		await Tools.findByPk(id)
			.then(async (tool) => {
				if (!tool) {
					return res.status(404).json({
						error: "Cannot find tool(s) with the id you provided.",
					});
				}

				await tool
					.update(
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
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
});

module.exports = {
	editToolsAPI,
};
