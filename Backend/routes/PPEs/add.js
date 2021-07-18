const { Router } = require("express");
const { PPEs } = require("../../models/PPEs");

const router = Router();

const addPPEsAPI = router.post("/", async (req, res) => {
	try {
		const { name, description, quantity } = req.body;
		if (!name) {
			return res.status(400).json({
				error: "Please input name of PPE(s)",
			});
		}
		if (!description) {
			return res.status(400).json({
				error: "Please input description of PPE(s)",
			});
		}
		if (!quantity) {
			return res.status(400).json({
				error: "Please input number of PPE(s)",
			});
		}
		if (parseInt(quantity) <= 0 || isNaN(quantity)) {
			return res.status(400).json({
				error: "Please input valid number of PPE(s)",
			});
		}

		await PPEs.create({
			name,
			description,
			quantity,
			available: quantity,
		})
			.then((ppe) => {
				return res.status(200).json({
					Success: `${ppe.name} successfully added`,
					ppe,
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
	addPPEsAPI,
};
