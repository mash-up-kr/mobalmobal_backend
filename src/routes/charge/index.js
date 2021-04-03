const express = require('express');
const router = express.Router();
const chargeController = require('../../controller/chargeController');
const auth = require('../../module/authUtils');

router.post('/', auth.isLoggedin, chargeController.createCharge);

module.exports = router;
