const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const Tools = db.define("Tools", {
	name: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.TEXT,
	},
	quantity: {
		type: DataTypes.BIGINT,
	},
	in_operation: {
		type: DataTypes.BOOLEAN,
	},
	deprecated: {
		type: DataTypes.BOOLEAN,
	},
});

module.exports = {
	Tools,
};
