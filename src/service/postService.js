const Post = require('../model/Post');
const { Op } = require('sequelize');

const operator = {
  DESC: Op.lt,
  ASC: Op.gt,
};

const getAll = async ({ item, limit, order }) => {
  const posts = await Post.findAll({
    where: {
      createdAt: {
        [operator[order]]: item,
      },
    },
    order: [['createdAt', order]],
    limit,
  });
  return posts;
};

const getById = async (post_id) => {
  const post = await Post.findOne({
    where: {
      post_id,
    },
  });

  return post;
};

const addPost = async (post) => {
  const postDoc = new Post(post);
  await postDoc.save();
  return postDoc;
};

module.exports = {
  getAll,
  getById,
  addPost,
};
