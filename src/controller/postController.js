const postService = require('../service/postService');
const statusCode = require('../module/statusCode');
const jwt = require('../module/jwt');
const { getSessionUserId } = require('../helper/getSessionUserId');

const getAll = async (req, res) => {
  try {
    let { item, limit, order } = req.query;
    item = item || 9999;
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

    if(!post){
      res.status(statusCode.BAD_REQUEST).json({
        code: statusCode.BAD_REQUEST,
        message: '유효하지 않은 id 값입니다.',
      });
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
    const jwtToken = req.headers.authorization;

    const user_id = getSessionUserId(jwtToken);

    const { title, goal, started_at, end_at } = postParams;

    if (!title || !goal || !started_at || !end_at) {
      res.status(statusCode.BAD_REQUEST).json({
        code: statusCode.BAD_REQUEST,
        message: '올바르지 않은 인자값입니다.',
      });
    }

    const post = await postService.addPost({ ...postParams, user_id });

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

module.exports = {
  getAll,
  getById,
  addPost,
};
