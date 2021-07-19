const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const Tools = db.define("Tools", {
	name: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.TEXT,
	},
	available: {
		type: DataTypes.BIGINT,
	},
	status: {
		type: DataTypes.STRING,
	},
	staff: {
		type: DataTypes.BIGINT,
	},
});

module.exports = {
	Tools,
};
