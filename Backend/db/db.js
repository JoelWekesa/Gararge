const dotenv = require("dotenv");
dotenv.config();

const { Sequelize } = require("sequelize");
const { database, usernamedb, passworddb } = process.env;

const db = new Sequelize(database, usernamedb, passworddb, {
	host: "localhost",
	dialect: "postgres",
});

module.exports = {
	db,
};
