const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const Machines = db.define("Machines", {
	name: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.TEXT,
	},
	commissioned: {
		type: DataTypes.BOOLEAN,
	},
	in_operation: {
		type: DataTypes.BOOLEAN,
	},
	deprecated: {
		type: DataTypes.BOOLEAN,
	},
});

module.exports = {
	Machines,
};
