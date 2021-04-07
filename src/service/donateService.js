const Donate = require('../model/Donate');
const Post = require('../model/Post');

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

module.exports = {
  createDonate,
};
