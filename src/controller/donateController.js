const donateService = require('../service/donateService');
const statusCode = require('../module/statusCode');
const InvalidParameterError = require('../errors/InvalidParameterError');

const createDonate = async (req, res) => {
  try {
    const { post_id, amount } = req.body;
    const user_id = req.decode.user_id;

    if (!post_id || !amount) {
      throw new InvalidParameterError();
    }

    const donate = await donateService.createDonate({ ...req.body, user_id });

    res.status(statusCode.CREATED).json({
      code: statusCode.CREATED,
      data: { donate },
    });
  } catch (err) {
    res.status(err.status || statusCode.INTERNAL_SERVER_ERROR).json({
      code: err.status || statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

const myDonate = async (req, res) => {
  try {
    const user_id = req.decode.user_id;
    const { status } = req.query;
    const donate = await donateService.getMyDonate(status, user_id);

    res.status(statusCode.OK).json({
      code: statusCode.OK,
      data: {
        donate,
      },
    });
  } catch (err) {
    res.status(err.status || statusCode.INTERNAL_SERVER_ERROR).json({
      code: err.status || statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

module.exports = {
  createDonate,
  myDonate,
};
