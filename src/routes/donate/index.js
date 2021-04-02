const express = require('express');
const router = express.Router();
const auth = require('../../module/authUtils');
const donateController = require('../../controller/donateController');

router.post('/', auth.isLoggedin, donateController.create);

module.exports = router;