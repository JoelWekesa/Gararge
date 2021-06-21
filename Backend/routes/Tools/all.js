const { Router } = require("express");
const { Tools } = require("../../models/Tools");

const router = Router();

const getAllToolsAPI = router.get("/", async (req, res) => {
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
	getAllToolsAPI,
};
