const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { Supplies } = require("../../models/Supplies");
const { secrets } = process.env;

const router = Router();

const addSuppliesAPI = router.post("/", async (req, res) => {
	try {
		const token = req.headers["x-access-token"];
		const { name, description, price, quantity, category } = req.body;

		await jwt.verify(token, secrets, (err, decoded) => {
			if (err) {
				return res.status(403).json({
					error: err.message,
				});
			}

			if (parseInt(price) <= 0) {
				return res.status(400).json({
					error: "Price cannot be less than or equal to zero.",
				});
			}

			if (parseInt(quantity) <= 0) {
				return res.status(400).json({
					error: "Quantity cannot be less than or equal to zero.",
				});
			}

			const { id } = decoded;

			Supplies.create({
				name,
				description,
				price,
				quantity,
				category,
				staff: id,
				available: quantity,
			})
				.then((supply) => {
					return res.status(200).json({
						Success: `Successfully added a supply.`,
						supply,
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
	addSuppliesAPI,
};
