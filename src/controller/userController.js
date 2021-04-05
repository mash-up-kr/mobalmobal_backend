const userService = require('../service/userService');
const statusCode = require('../module/statusCode');
const jwt = require('../module/jwt');
const InvalidParameterError = require('../errors/InvalidParameterError');

const login = async (req, res) => {
  try {
    const { fireStoreId } = req.body;

    if (!fireStoreId) {
      throw new InvalidParameterError();
    }

    const user = await userService.getByFireStoreId(fireStoreId);

    if (!user) {
      res.status(statusCode.NOT_FOUND).json({
        code: statusCode.NOT_FOUND,
        message: '회원가입이 필요합니다.',
      });
    }

    // 로그인 로직
    res.status(statusCode.OK).json({
      data: {
        token: jwt.sign(user),
      },
      code: statusCode.OK,
      message: '로그인에 성공하였습니다.',
    });
  } catch (err) {
    res.status(err.status || statusCode.INTERNAL_SERVER_ERROR).json({
      code: err.status || statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const { nickname, cash, provider, fireStoreId, ...values } = req.body;

    if (!nickname || !provider || !fireStoreId) {
      throw new InvalidParameterError();
    }

    const result = await userService.insertUser({ nickname, cash, provider, fireStoreId, ...values });

    // 로그인 로직
    const user = await userService.getByFireStoreId(fireStoreId);

    res.status(statusCode.OK).json({
      data: {
        token: jwt.sign(user),
      },
      code: statusCode.OK,
    });
  } catch (err) {
    res.status(err.status || statusCode.INTERNAL_SERVER_ERROR).json({
      code: err.status || statusCode.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user_id = req.decode.user_id;

    const user = await userService.getByUserId(user_id);

    return res.status(statusCode.OK).json({
      code: statusCode.OK,
      data: { user },
    });
  } catch (err) {
    res.status(err.status || statusCode.INTERNAL_SERVER_ERROR).json({
      code: err.status || statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

module.exports = {
  login,
  create,
  getUser,
};
