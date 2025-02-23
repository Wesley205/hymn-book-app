const { Sequelize } = require('sequelize');
const config = require('../config');

// Create and configure Sequelize instance
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    logging: false,  // Disable logging of SQL queries
    pool: {
      max: 5,          // Max pool size
      min: 0,          // Min pool size
      acquire: 30000,  // Max time (in ms) to wait for a connection
      idle: 10000,     // Max idle time before a connection is released
    },
  }
);

module.exports = sequelize;
