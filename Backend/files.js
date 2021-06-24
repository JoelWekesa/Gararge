const dotenv = require("dotenv");
dotenv.config();
const {
	TWILIO_TOKEN,
	TWILIO_ACCOUNT_SID,
	password_staff,
	database,
	usernamedb,
	passworddb,
} = process.env;

module.exports = {
	TWILIO_TOKEN,
	TWILIO_ACCOUNT_SID,
	password_staff,
	database,
	usernamedb,
	passworddb,
};
