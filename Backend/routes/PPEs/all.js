const { Router } = require("express");
const { PPEs } = require("../../models/PPEs");

const router = Router();

const getAllPPEs = router.get("/", async (req, res) => {
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
	getAllPPEs,
};
