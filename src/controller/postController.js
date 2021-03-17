const postService = require('../service/postService');
const statusCode = require('../module/statusCode');

const getAll = async (req, res) => {
    try {
        let { item, limit, order } = req.query;
        item = item || Date.now();
        limit = limit || 30;
        order = order || "DESC"
        const posts = await postService.getAll({
            item,
            limit,
            order,
        });
        res.status(statusCode.OK).json({
            code: statusCode.OK,
            data: { posts }
        });
    } catch (err) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            code: statusCode.INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
}

const getById = async (req, res) => {
  try{
    let { post_id } = req.params;
    const post = await postService.getById(post_id);

    if(!post){
      res.status(statusCode.OK).json({
        code: statusCode.BAD_REQUEST,
        message: '유효하지 않은 id 값입니다.'
      });
    }

    res.status(statusCode.OK).json({
      code: statusCode.OK,
      data: { post }
    })

  } catch(err){
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      code: statusCode.INTERNAL_SERVER_ERROR,
      message: err.message
    })
  }
}

module.exports = {
    getAll,
    getById
}