const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const Sales = db.define("Sales", {
	product: {
		type: DataTypes.BIGINT,
	},
	staff: {
		type: DataTypes.BIGINT,
	},
	price: {
		type: DataTypes.BIGINT,
	},
	quantity: {
		type: DataTypes.BIGINT,
	},
});

module.exports = {
	Sales,
};
