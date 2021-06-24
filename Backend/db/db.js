const { Sequelize } = require("sequelize");
const { database, usernamedb, passworddb } = require("../files");

const db = new Sequelize(database, usernamedb, passworddb, {
	host: "localhost",
	dialect: "postgres",
});

module.exports = {
	db,
};
