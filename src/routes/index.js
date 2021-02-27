const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.use('/posts', require('./posts'));
router.use('/users', require('./users'));

module.exports = router;
