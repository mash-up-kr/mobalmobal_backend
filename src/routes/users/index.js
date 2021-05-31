const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const auth = require('../../module/authUtils');

router.post('/login', userController.login);
router.post('/', userController.create);
router.get('/', auth.isLoggedin, userController.getUser);
router.patch('/', auth.isLoggedin, userController.updateUser);

module.exports = router;
