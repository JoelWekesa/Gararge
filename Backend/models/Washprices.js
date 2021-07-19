const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const Washprices = db.define("Washprices", {
	type: {
		type: DataTypes.STRING,
	},
	price: {
		type: DataTypes.BIGINT,
	},
});

module.exports = {
	Washprices,
};
