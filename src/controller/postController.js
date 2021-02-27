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

module.exports = {
    getAll
}