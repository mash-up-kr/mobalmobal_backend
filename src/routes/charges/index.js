const express = require('express');
const router = express.Router();
const chargeController = require('../../controller/chargeController');

router.post('/', chargeController.createCharge);

module.exports = router;
