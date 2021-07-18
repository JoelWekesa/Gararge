const { Router } = require("express");
const { Machines } = require("../../models/Machines");

const router = Router();

const getAllMachinesAPI = router.get("/", async (req, res) => {
	try {
		await Machines.findAndCountAll({
			order: [["id", "DESC"]],
		})
			.then((machines) => {
				return res.status(200).json({
					Success: "Successfully fetched all machines.",
					machines,
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
	getAllMachinesAPI,
};
