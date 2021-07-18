const { Router } = require("express");
const { Users } = require("../../models/Staff");
const { superAdmin } = require("../../middleware/super_admin/check")

const router = Router();

//? Add admin

router.put("/add/:id", [superAdmin], async (req, res) => {
	try {
		const { id } = req.params;
		if (isNaN(id)) {
			return res.status(400).json({
				message: "Invalid User ID.",
			});
		}

		await Users.findByPk(id)
			.then(async (user) => {
				if (!user) {
					return res.status(404).json({
						message: "We could not find a user with the ID you provided.",
					});
				}

				await Users.update(
					{
						admin: true,
					},
					{
						where: {
							id,
						},
					}
				)
					.then(() => {
						return res.status(200).json({
							Success: "Admin was successfully added",
						});
					})
					.catch((err) => {
						return res.status(500).json({
							message: err.message,
						});
					});
			})
			.catch((err) => {
				return res.status(500).json({
					message: err.message,
				});
			});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
});

//? Remove admin

router.delete("/remove/:id", [superAdmin], async (req, res) => {
	try {
		const { id } = req.params;
		if (!id || isNaN(id)) {
			return res.status(400).json({
				message: "Invalid User ID.",
			});
		}

		await Users.findByPk(id)
			.then(async (user) => {
				if (!user) {
					return res.status(404).json({
						message: "We could not find a user with the ID you provided.",
					});
				}

				await Users.update(
					{
						admin: false,
					},
					{
						where: {
							id,
						},
					}
				)
					.then(() => {
						return res.status(200).json({
							Success: "Admin was successfully removed",
						});
					})
					.catch((err) => {
						return res.status(500).json({
							message: err.message,
						});
					});
			})
			.catch((err) => {
				return res.status(500).json({
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
