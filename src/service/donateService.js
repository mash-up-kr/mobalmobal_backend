const Donate = require('../model/Donate');

const createDonate = async (donate) => {
    const donate = await Donate.create(donate);
    return donate;
};

module.exports = {
    createDonate,
}