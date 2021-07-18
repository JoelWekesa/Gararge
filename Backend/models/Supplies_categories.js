const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const Supplies_categories = db.define("Supplies_categories", {
	name: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.TEXT,
	},
});

module.exports = {
	Supplies_categories,
};
