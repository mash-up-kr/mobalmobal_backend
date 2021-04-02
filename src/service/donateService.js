const Donate = require('../model/Donate');

const create = async (donate) => {
    await Donate.create(donate)
    .then(donate => {
        return donate;
    });
};

module.exports = {
    create,
}