const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const Supplies = db.define("Supplies", {
	name: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.TEXT,
	},
	price: {
		type: DataTypes.BIGINT,
	},
	quantity: {
		type: DataTypes.BIGINT,
	},
	available: {
		type: DataTypes.BIGINT,
	},
	staff: {
		type: DataTypes.BIGINT,
	},
	category: {
		type: DataTypes.BIGINT,
	},
	qrcode: {
		type: DataTypes.TEXT,
	},
});

module.exports = {
	Supplies,
};
