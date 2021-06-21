const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const AssignPPEs = db.define("AssignPPEs", {
	staff: {
		type: DataTypes.BIGINT,
	},
	assigned_by: {
		type: DataTypes.BIGINT,
	},
	PPE: {
		type: DataTypes.BIGINT,
	},
	quantity: {
		type: DataTypes.BIGINT,
	},
});

module.exports = {
	AssignPPEs,
};
