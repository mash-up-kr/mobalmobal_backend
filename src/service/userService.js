const User = require('../model/User');

const getByFireStoreId = async (fireStoreId) => {
  const user = await User.findOne({
    where: {
      firestore_id: fireStoreId,
    },
  });

  return user;
};

const getByUserId = async (userId) => {
  const user = await User.findOne({
    where: {
      user_id: userId,
    },
  });

  return user;
};

const isUniqueName = async (nickname) => {
  const user = await User.findOne({
    where: { nickname },
  });
  if (!user) return true;
  return false;
};

const insertUser = async ({ nickname, cash, provider, fireStoreId, ...values }) => {
  if (!(await isUniqueName(nickname))) {
    let error = new Error('이미 사용중인 닉네임입니다.');
    error.name = 'BAD_REQUEST';
    throw error;
  }

  cash = cash || 0;

  values = camelToSnakeCase(values);

  const user = await User.create({
    nickname,
    cash,
    provider,
    firestore_id: fireStoreId,
    ...values,
  });
  return user;
};

module.exports = {
  getByFireStoreId,
  insertUser,
  getByUserId,
};

const camelToSnakeCase = (params) => {
  return Object.entries(params)
    .map(([k, v]) => {
      return [k.replace(/[A-Z]/g, (match) => '_' + match.toLowerCase()), v];
    })
    .reduce((acc, [k, v]) => {
      acc[k] = v;
      return acc;
    }, {});
};
