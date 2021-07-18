const { Router } = require("express");
const { Machines } = require("../models/Machines");
const { superAdmin} = require("../middleware/super_admin/check")
const { admin } = require("../middleware/admin/check")

const router = Router();

//? Add Machines 

router.post("/add", [superAdmin], async (req, res) => {
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
			status: "In operation",
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

//? Get all machines

router.get("/all", [admin], async (req, res) => {
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

//? Operationalize machine

router.put("/operationalize/:id", [admin], async (req, res) => {
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
					status: "In operation"
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

//? Deprecate machine  
router.put("/deprecate/:id", [admin], async (req, res) => {
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
					error: "Machine with the provided ID does not exists.",
				});
			}
			await Machines.update(
				{
					status: "deprecated"
				},
				{
					where: {
						id,
					},
				}
			)
				.then(() => {
					return res.status(200).json({
						Success: "Machine was successfully deprecated.",
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


module.exports = router
