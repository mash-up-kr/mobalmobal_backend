const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');

router.get('/', postController.getAll);
router.get('/:post_id', postController.getById)

module.exports = router;