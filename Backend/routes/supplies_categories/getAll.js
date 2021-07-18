const { Router } = require("express");
const { Supplies_categories } = require("../../models/Supplies_categories");

const router = Router();

const getAllSuppliesCategoriesAPI = router.get("/", async (req, res) => {
	try {
		await Supplies_categories.findAndCountAll({
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
	getAllSuppliesCategoriesAPI,
};
