const Donate = require('../model/Donate');

const create = async (donate) => {
    const createDonate = await Donate.create(donate);
    return createDonate;
};

module.exports = {
    create,
}