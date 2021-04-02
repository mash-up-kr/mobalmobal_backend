const donateService = require('../service/donateService');
const statusCode = require('../module/statusCode');
const { getSessionUserId } = require('../helper/getSessionUserId');


const create = async (req, res) => {
    try {
        const { post_id, amount } = req.body;
        const user_id = req.decode.user_id;

        if(!post_id || !amount) {
            res.status(statusCode.BAD_REQUEST).json({
                code: statusCode.BAD_REQUEST,
                message: '필요한 인자값이 없습니다.',
            });
        }

        const donate = await donateService.create({ ...req.body, user_id });

        res.status(statusCode.CREATED).json({
            code: statusCode.CREATED,
            data:{ donate },
        });
    } catch (err) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            code: statusCode.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    }

};

module.exports = {
    create,
};