const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const Categories = db.define("Categories", {
	name: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.TEXT,
	},
});

module.exports = {
	Categories,
};
