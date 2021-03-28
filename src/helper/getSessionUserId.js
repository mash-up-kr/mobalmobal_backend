const jwt = require('../module/jwt');

const getSessionUserId = (jwtToken) => {
  if (!jwtToken) {
    throw new Error('토큰 값이 없습니다.');
  }

  const session = jwt.verify(jwtToken);

  if (session === -2) {
    throw new Error('유효하지 않은 토큰값입니다.');
  }

  if (session === -3) {
    throw new Error('토큰이 만료되었습니다.');
  }

  return session.user_id;
};

module.exports = {
  getSessionUserId,
};
