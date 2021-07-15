const { Router } = require("express");
const dotenv = require("dotenv");
dotenv.config();
var bcrypt = require("bcryptjs");
const { Users } = require("../../models/Staff");
const { Resetcodes } = require("../../models/ResetCodes");
const { TWILIO_TOKEN, TWILIO_ACCOUNT_SID, password_staff } = process.env;

const router = Router();
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_TOKEN);

const addStaffAPI = router.post("/", (req, res) => {
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
			const code = Math.floor(1000000 * Math.random()).toString(); //? Bcrypt only encrypts strings.
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
				.then(async (user) => {
					await Resetcodes.create({
						user: user.id,
						code: bcrypt.hashSync(code, 10),
					})
						.then(() => {
							client.messages
								.create({
									body: `Your reset code is ${code}`,
									from: "+13372431053",
									to: `+254${user.phone_number}`,
								})
								.then(() => {
									return res
										.status(200)
										.json({
											Success: "Account successfully created.",
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
	addStaffAPI,
};
