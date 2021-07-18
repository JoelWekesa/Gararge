const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const Resetcodes = db.define("Resetcodes", {
	user: {
		type: DataTypes.BIGINT,
	},
	code: {
		type: DataTypes.TEXT,
	},
});

module.exports = {
	Resetcodes,
};
