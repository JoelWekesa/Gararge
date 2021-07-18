const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const Machines = db.define("Machines", {
	name: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.TEXT,
	},
	status: {
		type: DataTypes.STRING,
	},
});

module.exports = {
	Machines,
};
