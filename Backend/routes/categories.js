const { Router } = require("express");
const { Categories } = require("../models/Categories");
const { admin } = require("../middleware/admin/check")

const router = Router();

//? Add categories

router.post("/add", [admin], async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res.status(400).json({
				message: "Please input category name",
			});
		}

		if (!description) {
			return res.status(400).json({
				message: "Please input category description",
			});
		}

		await Categories.create({
			name,
			description,
		})
			.then((category) => {
				return res.status(200).json({
					Success: "Successfully added a category",
					category,
				});
			})
			.catch((err) => {
				return res.status(400).json({
					message: err.message,
				});
			});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
});

//? Get all categories 

router.get("/all", [admin], async (req, res) => {
	try {
		await Categories.findAndCountAll({
			order: [["id", "DESC"]],
		})
			.then((categories) => {
				return res.status(200).json({
					Success: "Successfully fetched all supplies categories.",
					categories,
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

module.exports = router;
