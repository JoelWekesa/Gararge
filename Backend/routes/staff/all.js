const { Router } = require("express");
const { Users } = require("../../models/Staff");

const router = Router();

const allStaffAPI = router.get("/", (req, res) => {
	try {
		Users.findAndCountAll({
			order: [["id", "DESC"]],
		}).then((users, err) => {
			if (err) {
				return res.status(500).json({
					error: "Failed",
				});
			}
			return res.status(200).json({
				message: "Successfully fetched all users.",
				users,
			});
		});
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
});

module.exports = {
	allStaffAPI,
};
