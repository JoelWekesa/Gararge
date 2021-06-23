const { Router } = require("express");
const { Departments } = require("../../models/Departments");
const router = Router();

const allDepartmentsAPI = router.get("/", async (req, res) => {
	try {
		Departments.findAndCountAll({
			order: [["id", "DESC"]],
		})
			.then((departments) => {
				return res.status(200).json({
					Success: "Successfully fetched all departments.",
					departments,
				});
			})
			.catch((err) => {
				return res.status(200).json({
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
	allDepartmentsAPI,
};
