const User = require('../model/User');

const getByFireStoreId = async (fireStoreId) => {
  console.log('fireStoreId', fireStoreId);

  const user = await User.findOne({
    where: {
      firestore_id: fireStoreId,
    },
  });

  return user;
};

module.exports = {
  getByFireStoreId,
};
