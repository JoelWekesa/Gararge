const { Router } = require("express");
const { Tools } = require("../../models/Tools");

const router = Router();

const addToolsAPI = router.post("/", async (req, res) => {
	try {
		const { name, description, quantity } = req.body;
		if (!name) {
			return res.status(400).json({
				error: "Please input name of the tool(s)",
			});
		}

		if (!description) {
			return res.status(400).json({
				error: "Please input description of the tool(s)",
			});
		}

		if (isNaN(quantity) || parseInt(quantity) <= 0) {
			return res.status(400).json({
				error: "Please input valid number of the tool(s)",
			});
		}

		if (!quantity) {
			return res.status(400).json({
				error: "Please input number of the tool(s)",
			});
		}

		Tools.create({
			name,
			description,
			quantity,
			available: quantity,
		})
			.then((tool) => {
				return res.status(200).json({
					Success: `${tool.name} was successfully added.`,
					tool,
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
	addToolsAPI,
};
