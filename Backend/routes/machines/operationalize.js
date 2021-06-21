const { Router } = require("express");
const { Machines } = require("../../models/Machines");

const router = Router();

const operationalizeMachineAPI = router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		if (isNaN(id)) {
			return res.status(400).json({
				error: "Invalid machine ID.",
			});
		}

		await Machines.findByPk(id).then(async (machine) => {
			if (!machine) {
				return res.status(404).json({
					error: "Machine with the provided ID does not exist.",
				});
			}
			await Machines.update(
				{
					in_operation: true,
					deprecated: false,
				},
				{
					where: {
						id,
					},
				}
			)
				.then(() => {
					return res.status(200).json({
						Success: "Machine was successfully operationalized.",
					});
				})
				.catch((err) => {
					return res.status(400).json({
						error: err.message,
					});
				});
		});
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
});

module.exports = {
	operationalizeMachineAPI,
};
