const { Router } = require("express");
const { Users } = require("../models/Staff");

const router = Router();

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		if (!id || isNaN(id)) {
			return res.status(400).json({
				error: "Invalid User ID.",
			});
		}

		await Users.findByPk(id)
			.then(async (user) => {
				if (!user) {
					return res.status(404).json({
						error: "We could not find a user with the ID you provided.",
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
							error: err.message,
						});
					});
			})
			.catch((err) => {
				return res.status(500).json({
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
	removeAdminAPI: router,
};
