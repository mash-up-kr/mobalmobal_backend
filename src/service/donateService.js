const Donate = require('../model/Donate');
const Post = require('../model/Post');
const User = require('../model/User');
const { generatePostFilter } = require('./postService');

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

const getMyDonate = async (status, user_id) => {
  const donate = await Donate.findAll({
    where: {
      user_id,
    },
    include: [
      {
        model: Post,
        where: {
          ...generatePostFilter(status),
        },
        as: 'post',
      },
    ],
  });

  return donate;
};

module.exports = {
  createDonate,
  getMyDonate,
};
