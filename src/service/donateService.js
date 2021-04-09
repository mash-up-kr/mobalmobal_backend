const Donate = require('../model/Donate');
const Post = require('../model/Post');
const { Op } = require('sequelize');
const moment = require('moment');

const createDonate = async (donate) => {
  const donateDoc = await Donate.create(donate);

  const { amount, post_id } = donate;

  await Post.increment(
    {
      current_amount: amount,
    },
    {
      where: {
        post_id,
      },
    }
  );

  return donateDoc;
};

const getMyDonate = async (user_id) => {
  const donate = await Donate.findAll({
    where: {
      user_id,
    },
    include: [
      {
        model: Post,
        where: {
          started_at: {
            [Op.lte]: moment().tz('Asia/Seoul').toDate(),
          },
          end_at: {
            [Op.gte]: moment().tz('Asia/Seoul').toDate(),
          },
        },
        attributes: [],
      },
    ],
  });

  return donate;
};

module.exports = {
  createDonate,
  getMyDonate,
};
