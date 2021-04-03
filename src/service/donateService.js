const Donate = require('../model/Donate');

const createDonate = async (donate) => {
  const donateDoc = await Donate.create(donate);
  return donateDoc;
};

module.exports = {
  createDonate,
};
