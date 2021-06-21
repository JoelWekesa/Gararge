const { Router } = require("express");
const { Machines } = require("../../models/Machines");

const router = Router();

const addMachinesAPI = router.post("/", async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res.status(400).json({
				error: "Please enter the name of the machine.",
			});
		}
		if (!description) {
			return res.status(400).json({
				error: "Please enter the description of the machine.",
			});
		}

		Machines.create({
			name,
			description,
			commissioned: true,
			in_operation: true,
		})
			.then((machine) => {
				return res.status(200).json({
					Success: `${machine.name} was successfully added.`,
					machine,
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
	addMachinesAPI,
};
