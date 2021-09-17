const { Router } = require("express");
const { Carwashes } = require("../models/Carwashes");
const { Washprices } = require("../models/Washprices");
const { admin } = require("../middleware/admin/check")
const { Op } = require("sequelize")

const router = Router();

// ? Add car wash.

router.post("/add", [admin], async (req, res) => {
	try {
		const { staff, type, plates } = req.body;
		if (!staff) {
			return res.status(400).json({ message: "Please select a staff" });
		}
		if (!type) {
			return res.status(400).json({ message: "Please select a type" });
		}
		if (!plates) {
			return res.status(400).json({ message: "Please input vehicle plates" });
		}

		if (/\s/.test(plates) || plates.length < 6) {
			return res
				.status(400)
				.json({ message: "Please input valid vehicle plates" });
		}

		await Washprices.findOne({ where: { type } }).then(async (item) => {
			await Carwashes.create({
				staff,
				type,
				plates: plates.toUpperCase(),
				price: item.price,
			})
				.then(() => {
					return res
						.status(200)
						.json({ Success: "Car wash entry was successfully created." });
				})
				.catch((err) => {
					return res.status(500).json({ message: err.message });
				});
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});


//? Get all washes

router.get("/all", (req, res) => {
	try {
		Carwashes.findAndCountAll({ order: [["id", "DESC"]] })
			.then((washes) => {
				return res.status(200).json({ washes });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

/**Get weekly car wash */

router.get("/weekly", [admin], (req, res) => {
	try {
		Carwashes.findAll({
			where: {
				createdAt: {
					[Op.lt]: new Date(),
					[Op.gt]: new Date(new Date() - 24 * 7 * 60 * 60 * 1000),
				},
			},
		})
			.then((data) => {
				total = 0;
				data.forEach((item) => {
					total += parseInt(item.price);
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

/**End of weekly car wash */

//? All carwashes gross price

router.get("/totals", async (req, res) => {
	try {
		total = 0;
		await Carwashes.findAll()
			.then((washes) => {
				washes.forEach((wash) => {
					total += parseInt(wash.price);
				});
				return res.status(200).json({
					total,
				});
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

//? All washes today gross price

router.get("/totals/today", async (req, res) => {
	try {
		let today = 0;
		let start = new Date();
		start.setHours(0, 0, 0, 0);

		let end = new Date();
		end.setHours(23, 59, 59, 999);

		Carwashes.findAll({ order: [["id", "DESC"]] })
			.then((washes) => {
				washes.forEach((wash) => {
					if (
						wash.createdAt <= new Date(end) &&
						wash.createdAt >= new Date(start)
					) {
						today += parseInt(wash.price);
					}
				});

				return res.status(200).json({ today });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

//? All washes today gross price per staff
router.get("/totals/today/:id", async (req, res) => {
	try {
		let today = 0;
        let vehicles = [];
		let start = new Date();
		const { id } = req.params;

		start.setHours(0, 0, 0, 0);

		let end = new Date();
		end.setHours(23, 59, 59, 999);

		Carwashes.findAll({ where: { staff: id } })
			.then((washes) => {
				washes.forEach((wash) => {
					if (
						wash.createdAt <= new Date(end) &&
						wash.createdAt >= new Date(start)
					) {
						today += parseInt(wash.price);
                        vehicles.push(wash.type)
					}
				});

				return res.status(200).json({ total: today, vehicles });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;
