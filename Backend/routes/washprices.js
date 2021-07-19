const { Router } = require("express");
const { Washprices } = require("../models/Washprices");

const router = Router();

//? Get all prices

router.get("/all", async (req, res) => {
	try {
		Washprices.findAndCountAll({ order: [["id", "DESC"]] }).then((prices) => {
			return res.status(200).json({ Success: "Successfully fetched prices" });
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

//? Add prices

router.post("/add", async (req, res) => {
	try {
		const { type, price } = req.body;
		if (!price) {
			return res.status(400).json({ message: "Please input price." });
		}
		if (!type) {
			return res.status(400).json({ message: "Please input type" });
		}

		Washprices.create({ type, price })
			.then((price) => {
				return res
					.status(200)
					.json({ message: "Price successfully added", price });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

//? Edit price and type

router.put("/price/:id", async (req, res) => {
	try {
		const { price, type } = req.body;
		const { id } = req.params;
		await Washprices.update(
			{
				price: price ? price : price,
				type: type ? type : type,
			},
			{ where: { id } }
		)
			.then(() => {
				return res.status(200).json({ Success: "Edit was successful" });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

//? Delete price and type

router.delete("/price/:id", async (req, res) => {
	try {
		const { id } = req.params
		await Washprices.destroy({ where: { id } })
			.then(() => {
				return res
					.status(200)
					.json({ Success: "Delete process was a success" });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;
