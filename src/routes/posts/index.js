const express = require('express');
const router = express.Router();
const upload = require('../../module/s3')
const postController = require('../../controller/postController');
const auth = require('../../module/authUtils');

router.get('/', postController.getAll);
router.get('/my', auth.isLoggedin, postController.getMyPost);
router.get('/:post_id', postController.getById);
router.post('/', auth.isLoggedin, upload.single('post_image'), postController.addPost);

module.exports = router;
