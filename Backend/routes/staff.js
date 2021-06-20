const { Router } = require("express");
var bcrypt = require("bcryptjs");
const { Users } = require("../models/Staff");
const { password_staff } = process.env;

const router = Router();

router.post("/", (req, res) => {
	const {
		first_name,
		last_name,
		username,
		national_id,
		phone_number,
		department,
	} = req.body;
	try {
		if (
			first_name &&
			last_name &&
			username &&
			national_id &&
			phone_number &&
			department
		) {
			Users.create({
				first_name,
				last_name,
				username,
				national_id,
				phone_number,
				department,
				staff: true,
				password: bcrypt.hashSync(password_staff, 10),
			})
				.then((user) => {
					return res.status(200).json({
						message: "Staff successfully added.",
						user,
					});
				})
				.catch((err) => {
					return res.status(400).json({
						error: err.message,
					});
				});
		} else {
			return res.status(400).json({
				error: "Please fill all fields before adding a staff member.",
			});
		}
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
});

module.exports = {
	addStaffAPI: router,
};
