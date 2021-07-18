const { Router } = require("express");
const { Departments } = require("../models/Departments");
const router = Router();
const { admin } = require("../middleware/admin/check");

//? Get all departments

router.get("/all", [admin], async (req, res) => {
	try {
		Departments.findAndCountAll({
			order: [["id", "DESC"]],
		})
			.then((departments) => {
				return res.status(200).json({
					Success: "Successfully fetched all departments.",
					departments,
				});
			})
			.catch((err) => {
				return res.status(200).json({
					message: err.message,
				});
			});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
});

//? Add departments

router.post("/add", [admin], async (req, res) => {
	try {
		const { department } = req.body;
		if (!department) {
			return res.status(400).json({
				message: "Please input a department name",
			});
		}
		await Departments.create({
			department,
		})
			.then(() => {
				return res
					.status(200)
					.json({ Success: "Successfully added a department." });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;
