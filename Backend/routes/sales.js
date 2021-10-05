const { Router } = require("express");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { Sales } = require("../models/Sales");
const { Supplies } = require("../models/Supplies");
const { secrets } = process.env;
const { admin } = require("../middleware/admin/check");

const router = Router();

//? Get all sales

router.get("/all", [admin], async (req, res) => {
	try {
		Sales.findAndCountAll({ order: [["id", "DESC"]] })
			.then((sales) => {
				return res
					.status(200)
					.json({ Success: "Successfully fetched all sales", sales });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.get("/monthly", [admin], (req, res) => {
	try {
		Sales.findAll({
			where: {
				
				[Op.and] : [{ month: new Date().getMonth()}, {year: new Date().getFullYear()}]
				
			},
		})
			.then((data) => {
				total = 0;
				data.forEach((item) => {
					total += parseInt(item.price) * parseInt(item.quantity);
				});

				return res.status(200).json({ total });
			})
			.catch((err) => {
				return res.status(400).json({ error: err.message });
			});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

//? Make a sale

router.post("/add/:id", [admin], async (req, res) => {
	try {
		let available = 0;
		const { id } = req.params;
		const token = req.headers["x-access-token"];
		const { quantity, price } = req.body;
		if (!quantity || isNaN(quantity) || parseInt(quantity) === 0) {
			return res.status(400).json({
				message: "Please input correct sale quantity.",
			});
		}
		if (isNaN(id)) {
			return res.status(400).json({
				message: "Invalid ID format.",
			});
		}
		await Supplies.findByPk(id)
			.then(async (supply) => {
				if (!supply) {
					return res.status(404).json({
						message: "The item you queried does not exist",
					});
				}

				available += supply.available;

				await jwt.verify(token, secrets, async (err, decode) => {
					if (err) {
						return res.status(403).json({
							message: err.message,
						});
					}

					const staff = decode["id"];
					await Sales.create({
						product: id,
						price,
						staff,
						quantity,
						month: new Date().getMonth(),
						year: new Date().getFullYear(),
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
										message: "Successfully made a sale.",
										sale,
									});
								})
								.catch((err) => {
									return res.status(400).json({
										message: err.message,
									});
								});
						})
						.catch((err) => {
							return res.status(400).json({
								message: err.message,
							});
						});
				});
			})
			.catch((err) => {
				return res.status(404).json({
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
