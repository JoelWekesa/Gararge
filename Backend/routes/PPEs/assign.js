const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { AssignPPEs } = require("../../models/AssignPPEs");
const { PPEs } = require("../../models/PPEs");
const { secrets } = process.env;

const router = Router();

const assignPPEsAPI = router.post("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const token = req.headers["x-access-token"];
		const { staff, quantity } = req.body;

		if (isNaN(id)) {
			return res.status(400).json({
				error: "Invalid PPE id",
			});
		}
		await PPEs.findByPk(id)
			.then(async (ppe) => {
				if (!ppe) {
					return res.status(404).json({
						error: "PPE(s) with the provided ID could not be found.",
						id,
					});
				}

				await jwt.verify(token, secrets, async (err, decoded) => {
					if (err) {
						return res.status(403).json({
							error: err.message,
						});
					}
					const PPE = ppe["id"];
					const assigned_by = decoded["id"];

					if (parseInt(quantity) <= 0 || isNaN(quantity)) {
						return res.status(400).json({
							error: "Please select a valid quantity to assign.",
						});
					}

					if (parseInt(quantity) > parseInt(ppe.available)) {
						return res.status(400).json({
							error: "Not enough PPEs.",
						});
					}

					await AssignPPEs.create({
						staff,
						quantity,
						PPE,
						assigned_by,
					})
						.then(async () => {
							await ppe
								.update(
									{
										available: (
											parseInt(ppe.available) - parseInt(quantity)
										).toString(),
									},
									{
										where: {
											id,
										},
									}
								)
								.then(() => {
									return res.status(200).json({
										Success: `${ppe.name} was successfully assigned.`,
										ppe,
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
				return res.status(400).json({
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
	assignPPEsAPI,
};
