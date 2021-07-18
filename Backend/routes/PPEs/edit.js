const { Router } = require("express");
const { PPEs } = require("../../models/PPEs");

const router = Router();

const editPPEsAPI = router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description, quantity } = req.body;
		await PPEs.findByPk(id)
			.then(async (ppe) => {
				if (!ppe) {
					return res.status(404).json({
						error: "Cannot find PPE(s) with the id you provided.",
					});
				}

				await ppe
					.update(
						{
							name: name ? name : ppe.name,
							description: description ? description : ppe.description,
							quantity: quantity
								? parseInt(ppe.quantity) + parseInt(quantity)
								: ppe.quantity,
							available: quantity
								? parseInt(ppe.available) + parseInt(quantity)
								: ppe.available,
						},
						{
							where: {
								id,
							},
						}
					)
					.then(() => {
						return res.status(200).json({
							Success: `${ppe.name} Successfully updated.`,
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
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
});

module.exports = {
	editPPEsAPI,
};
