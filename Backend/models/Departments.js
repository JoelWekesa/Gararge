const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const Departments = db.define("Departments", {
	department: {
		type: DataTypes.STRING,
	},
});

module.exports = {
	Departments,
};
