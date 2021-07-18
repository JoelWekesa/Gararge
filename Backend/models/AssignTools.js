const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const AssignTools = db.define("AssignTools", {
	staff: {
		type: DataTypes.BIGINT,
	},
	assigned_by: {
		type: DataTypes.BIGINT,
	},
	tool: {
		type: DataTypes.BIGINT,
	},
	quantity: {
		type: DataTypes.BIGINT,
	},
});

module.exports = {
	AssignTools,
};
