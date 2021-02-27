const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const User = require('../model/User');

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

db.User = User;
User.init(sequelize);
db.Post = require('../model/Post')(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

module.exports = db;
