const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');

router.post('/', userController.login);
router.post('/login', userController.create);

module.exports = router;