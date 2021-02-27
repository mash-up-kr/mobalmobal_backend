const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const { sequelize } = require('./src/module/sequelize');
const indexRouter = require('./src/routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

sequelize.sync({ forcs: false })
.then(() => {
    console.log("DB 연결 성공");
})
.catch((err) => {
    console.error(err);
});

module.exports = app;
