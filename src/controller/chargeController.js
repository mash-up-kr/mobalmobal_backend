const chargeService = require('../service/chargeService');
const { getSessionUserId } = require('../helper/getSessionUserId');
const InvalidParameterError = require('../errors/InvalidParameterError');
const statusCode = require('../module/statusCode');

const createCharge = async (req, res) => {
  try {
    const chargeParams = req.body;
    const jwtToken = req.headers.authorization;

    const user_id = getSessionUserId(jwtToken);

    const { amount, user_name, charged_at } = chargeParams;

    if (!amount || !user_name || !charged_at) {
      throw new InvalidParameterError();
    }

    const charge = await chargeService.createCharge({ ...chargeParams, user_id });

    res.status(statusCode.OK).json({
      code: statusCode.OK,
      data: { charge },
    });
  } catch (err) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      code: statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

module.exports = {
  createCharge,
};
