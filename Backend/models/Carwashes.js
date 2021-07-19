const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const Carwashes = db.define("Carwashes", {
	type: {
		type: DataTypes.STRING,
	},
	staff: {
		type: DataTypes.BIGINT,
	},
	plates: {
		type: DataTypes.STRING,
	},
	price: {
		type: DataTypes.BIGINT,
	},
});

module.exports = {
	Carwashes,
};
