const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'delvelopment';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

module.exports = db;
