const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');

router.get('/', postController.getAll);

module.exports = router;