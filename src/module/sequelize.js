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

User.init(sequelize);
Post.init(sequelize);
Charge.init(sequelize);
Donate.init(sequelize);

User.associate(db);
Post.associate(db);
Charge.associate(db);
Donate.associate(db);

module.exports = db;
