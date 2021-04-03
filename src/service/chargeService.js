const Charge = require('../model/Charge');

const createCharge = async (charge) => {
  const chargeDoc = new Charge(charge);
  await chargeDoc.save();

  return chargeDoc;
};

module.exports = {
  createCharge,
};
