const { Sequelize } = require("sequelize");
const dot = require("dotenv");

dot.config();

const db = new Sequelize(
	process.env.database,
	process.env.usernamedb,
	process.env.passworddb,
	{
		host: "localhost",
		dialect: "postgres",
	}
);

module.exports = {
	db,
};
