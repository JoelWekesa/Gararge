const { Router } = require("express");
const jwt = require("jsonwebtoken");
const QRCode = require("qrcode");
const { Supplies } = require("../models/Supplies");
const { secrets } = process.env;
const { admin } = require("../middleware/admin/check");

const router = Router();

//? Get all supplies

router.get("/all", [admin], async (req, res) => {
	try {
		await Supplies.findAndCountAll({ order: [["id", "DESC"]] })
			.then((supplies) => {
				return res
					.status(200)
					.json({ Success: "Successfully fetched all supplies", supplies });
			})
			.catch((err) => {
				return res.status(400).json({ message: err.message });
			});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

//? Add supplies

router.post("/add", [admin], async (req, res) => {
	try {
		const token = req.headers["x-access-token"];
		const { name, description, price, selling_price, quantity, category } = req.body;
		if (!name) {
			return res.status(400).json({ message: "Please input product name." });
		}
		if (!description) {
			return res
				.status(400)
				.json({ message: "Please input product description." });
		}
		if (!price) {
			return res.status(400).json({ message: "Please input product price." });
		}
		if (!selling_price) {
			return res.status(400).json({ message: "Please input product selling price." });
		}
		if (!quantity) {
			return res
				.status(400)
				.json({ message: "Please input product quantity." });
		}
		if (!category) {
			return res
				.status(400)
				.json({ message: "Please input product category." });
		}

		await jwt.verify(token, secrets, async (err, decoded) => {
			if (err) {
				return res.status(403).json({
					message: err.message,
				});
			}

			if (parseInt(price) <= 0) {
				return res.status(400).json({
					message: "Price cannot be less than or equal to zero.",
				});
			}

			if (parseInt(quantity) <= 0) {
				return res.status(400).json({
					message: "Quantity cannot be less than or equal to zero.",
				});
			}

			const { id } = decoded;
			const segs = [{ data: `${name}` }];

			await QRCode.toDataURL(segs, async (err, url) => {
				if (err) {
					return res.status(400).json({
						message: err.message,
					});
				}
				await Supplies.create({
					name,
					description,
					price,
					selling_price,
					quantity,
					category,
					staff: id,
					available: quantity,
					qrcode: url,
				})
					.then((supply) => {
						return res.status(200).json({
							Success: `Successfully added a supply.`,
							supply,
						});
					})
					.catch((err) => {
						return res.status(400).json({
							message: err.message,
						});
					});
			});
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
});

//? Update supplies

router.put("/edit/:id", async (req, res) => {
	try {
		const { description, selling_price, quantity, category } = req.body;
		const { id } = req.params;
		const token = req.headers["x-access-token"];
		await jwt.verify(token, secrets, (err, decoded) => {
			if (err) {
				return res.status(403).json({
					message: err.message,
				});
			}

			const staff = decoded["id"];

			Supplies.findByPk(id)
				.then((supply) => {
					if (!supply) {
						return res.status(404).json({
							message: "No supply with the provided id could be found.",
						});
					}

					if (parseInt(selling_price) <= 0) {
						return res.status(400).json({
							message: "Price cannot be less than or equal to zero.",
						});
					}

					if (parseInt(quantity) <= 0) {
						return res.status(400).json({
							message: "Quantity cannot be less than or equal to zero.",
						});
					}

					Supplies.update(
						{
							description: description ? description : supply.description,
							selling_price: selling_price ? selling_price : supply.selling_price,
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
								message: err.message,
							});
						});
				})
				.catch((err) => {
					return res.status(500).json({
						message: err.message,
					});
				});
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
});

//? Get specific product

router.get("/supply/:id", async (req, res) => {
	const { id } = req.params;
	await Supplies.findByPk(id)
		.then((supply) => {
			return res.status(200).json({ supply });
		})
		.catch((err) => {
			return res.status(404).json({ message: err.message });
		});
});

module.exports = router;
