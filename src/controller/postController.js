const postService = require('../service/postService');
const statusCode = require('../module/statusCode');
const InvalidParameterError = require('../errors/InvalidParameterError');

const getAll = async (req, res) => {
  try {
    let { item, limit, order } = req.query;
    item = item || 0;
    limit = limit || 30;
    order = order || 'DESC';
    const posts = await postService.getAll({
      item,
      limit,
      order,
    });
    res.status(statusCode.OK).json({
      code: statusCode.OK,
      data: { posts },
    });
  } catch (err) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      code: statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { post_id } = req.params;
    const post = await postService.getById(post_id);

    if (!post) {
      throw new InvalidParameterError();
    }

    res.status(statusCode.OK).json({
      code: statusCode.OK,
      data: { post },
    });
  } catch (err) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      code: statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

const addPost = async (req, res) => {
  try {
    const postParams = req.body;
    const user_id = req.decode.user_id;

    const { title, goal, started_at, end_at } = postParams;

    if (!title || !goal || !started_at || !end_at) {
      throw new InvalidParameterError();
    }

    const post = await postService.addPost({ ...postParams, user_id });

    res.status(statusCode.OK).json({
      code: statusCode.OK,
      data: { post },
    });
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({
        code: err.status,
        message: err.message,
      });

      return;
    }

    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      code: statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

const getMyPost = async (req, res) => {
  try {
    const user_id = req.decode.user_id;

    const posts = await postService.myPost(user_id);

    res.status(statusCode.OK).json({
      code: statusCode.OK,
      data: { posts },
    });
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({
        code: err.status,
        message: err.message,
      });

      return;
    }

    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      code: statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

module.exports = {
  getAll,
  getById,
  addPost,
  getMyPost,
};
