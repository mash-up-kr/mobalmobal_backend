const userService = require('../service/userService');
const statusCode = require('../module/statusCode');
const jwt = require('../module/jwt');

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

module.exports = {
  login,
};
