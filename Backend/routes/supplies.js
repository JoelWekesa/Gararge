const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { Supplies } = require("../models/Supplies");
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

const editSuppliesAPI = router.put("/:id", async (req, res) => {
	try {
		const { name, description, price, quantity, category } = req.body;
		const { id } = req.params;
		const token = req.headers["x-access-token"];
		await jwt.verify(token, secrets, (err, decoded) => {
			if (err) {
				return res.status(403).json({
					error: err.message,
				});
			}

			const staff = decoded["id"];

			Supplies.findByPk(id)
				.then((supply) => {
					if (!supply) {
						return res.status(404).json({
							error: "No supply with the provided id could be found.",
						});
					}

					Supplies.update(
						{
							name: name ? name : supply.name,
							description: description ? description : supply.description,
							price: price ? price : supply.price,
							quantity: quantity
								? parseInt(supply.quantity) + parseInt(quantity)
								: supply.quantity,
							available: quantity
								? parseInt(supply.available) + parseInt(quantity)
								: supply.available,
							category: category ? category : supply.category,
							staff,
						},
						{
							where: {
								id,
							},
						}
					)
						.then(() => {
							return res.status(200).json({
								Success: "Supply successfully updated.",
							});
						})
						.catch((err) => {
							return res.status(400).json({
								error: err.message,
							});
						});
				})
				.catch((err) => {
					return res.status(500).json({
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
	editSuppliesAPI,
};
