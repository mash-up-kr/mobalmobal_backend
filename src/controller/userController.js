const userService = require('../service/userService');
const statusCode = require('../module/statusCode');
const jwt = require('../module/jwt');
const { getSessionUserId } = require('../helper/getSessionUserId');

const login = async (req, res) => {
  try {
    const { fireStoreId } = req.body;

    if (!fireStoreId) {
      res.status(statusCode.BAD_REQUEST).json({
        code: statusCode.BAD_REQUEST,
        message: 'fireStoreId 필수 값입니다.',
      });
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
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      code: statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const { nickname, cash, provider, fireStoreId, ...values } = req.body;

    if (!nickname || !provider || !fireStoreId) {
      let error = new Error('필수 정보입니다.');
      error.name = 'BAD_REQUEST';
      throw error;
    }

    const result = await userService.insertUser({ nickname, cash, provider, fireStoreId, ...values });

    if (!result) {
      throw Error('회원가입 실패');
    }

    // 로그인 로직
    const user = await userService.getByFireStoreId(fireStoreId);
    if (!user) {
      throw Error('회원가입 실패');
    }
    res.status(statusCode.OK).json({
      data: {
        token: jwt.sign(user),
      },
      code: statusCode.OK,
    });
  } catch (error) {
    if (error.name === 'BAD_REQUEST') {
      return res.status(statusCode[error.name]).json({
        code: statusCode[error.name],
        message: error.message,
      });
    }
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      code: statusCode.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const jwtToken = req.headers.authorization;
    const userId = getSessionUserId(jwtToken);

    const user = await userService.getByUserId(userId);

    return res.status(statusCode.OK).json({
      code: statusCode.OK,
      data: { user },
    });
  } catch (err) {
    res.status(err.status).json({
      code: err.status,
      message: err.message,
    });
  }
};

module.exports = {
  login,
  create,
  getUser,
};
