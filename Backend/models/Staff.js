const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const Users = db.define("Users", {
	first_name: {
		type: DataTypes.STRING,
	},
	last_name: {
		type: DataTypes.STRING,
	},
	username: {
		type: DataTypes.STRING,
	},
	national_id: {
		type: DataTypes.BIGINT,
	},
	phone_number: {
		type: DataTypes.STRING,
	},
	department: {
		type: DataTypes.BIGINT,
	},
	password: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
	},
	staff: {
		type: DataTypes.BOOLEAN,
	},
	admin: {
		type: DataTypes.BOOLEAN,
	},
	super_admin: {
		type: DataTypes.BOOLEAN,
	},
});

module.exports = {
	Users,
};
