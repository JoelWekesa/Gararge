const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { Sales } = require("../../models/Sales");
const { Supplies } = require("../../models/Supplies");
const { secrets } = process.env;

const router = Router();

const makeSaleAPI = router.post("/:id", async (req, res) => {
	try {
		let available = 0;
		const { id } = req.params;
		const token = req.headers["x-access-token"];
		const { quantity, price } = req.body;
		if (!quantity || isNaN(quantity) || parseInt(quantity) === 0) {
			return res.status(400).json({
				error: "Please input correct sale quantity.",
			});
		}
		if (isNaN(id)) {
			return res.status(400).json({
				error: "Invalid ID format.",
			});
		}
		await Supplies.findByPk(id)
			.then(async (supply) => {
				if (!supply) {
					return res.status(404).json({
						error: "The item you queried does not exist",
					});
				}

				if (parseInt(quantity) > parseInt(supply.available)) {
					return res.status(400).json({
						error:
							"The requested amount for the sale exceeds the number of supplies in stock.",
					});
				}

				available += supply.available;

				await jwt.verify(token, secrets, async (err, decode) => {
					if (err) {
						return res.status(403).json({
							error: err.message,
						});
					}

					const staff = decode["id"];
					await Sales.create({
						product: id,
						price,
						staff,
						quantity,
					})
						.then(async (sale) => {
							await Supplies.update(
								{
									available: parseInt(available) - parseInt(sale.quantity),
								},
								{
									where: {
										id,
									},
								}
							)
								.then(() => {
									return res.status(200).json({
										Success: "Successfully made a sale.",
										sale,
									});
								})
								.catch((err) => {
									return res.status(400).json({
										error: err.message,
									});
								});
						})
						.catch((err) => {
							return res.status(400).json({
								error: err.message,
							});
						});
				});
			})
			.catch((err) => {
				return res.status(404).json({
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
	makeSaleAPI,
};
