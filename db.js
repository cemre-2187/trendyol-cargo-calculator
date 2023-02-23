const debug = require('debug')('sql');
const Sequelize = require('sequelize');
const purl = `postgres://${process.env.PRIMARYDB_USER}:${process.env.PRIMARYDB_PASSWORD}@${process.env.PRIMARYDB_ADDRESS}:${process.env.PRIMARYDB_PORT}/${process.env.PRIMARYDB_NAME}`;

const db = new Sequelize(purl, {
  logging: debug, // export DEBUG=sql in the environment to get SQL queries
  define: {
    underscored: true,       // use snake_case rather than camelCase column names
    freezeTableName: true,   // don't change table names from the one specified
    timestamps: true,        // automatically include timestamp columns
  }
});

module.exports = db;