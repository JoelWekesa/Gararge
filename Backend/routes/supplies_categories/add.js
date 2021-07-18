const { Router } = require("express");
const { Supplies_categories } = require("../../models/Supplies_categories");

const router = Router();

const AddSuppliesCategoriesAPI = router.post("/", async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res.status(400).json({
				error: "Please input category name",
			});
		}

		if (!description) {
			return res.status(400).json({
				error: "Please input category description",
			});
		}

		await Supplies_categories.create({
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
	AddSuppliesCategoriesAPI,
};
