const Sequelize = require('sequelize');
const User = require('../model/User');
const Post = require('../model/Post');
const Charge = require('../model/Charge');
const Donate = require('../model/Donate');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

db.User = User;
db.Post = Post;
db.Charge = Charge;
db.Donate = Donate;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].init) {
    db[modelName].init(sequelize);
  }
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
