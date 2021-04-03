const donateService = require('../service/donateService');
const statusCode = require('../module/statusCode');
const InvalidParameterError = require('../errors/InvalidParameterError');

const createDonate = async (req, res) => {
    try {
        const { post_id, amount } = req.body;
        const user_id = req.decode.user_id;

        if(!post_id || !amount) {
            throw new InvalidParameterError();
        }

        const donate = await donateService.createDonate({ ...req.body, user_id });

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
    createDonate,
};