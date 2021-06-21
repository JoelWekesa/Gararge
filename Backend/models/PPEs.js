const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const PPEs = db.define("PPEs", {
	name: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.TEXT,
	},
	quantity: {
		type: DataTypes.BIGINT,
	},
	available: {
		type: DataTypes.BIGINT,
	},
});

module.exports = {
	PPEs,
};
