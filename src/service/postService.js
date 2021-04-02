const Post = require('../model/Post');
const { Op } = require('sequelize');

const getAll = async ({ item, limit, order }) => {
  let where = {}
  if ( order === "DESC") {
    where = { 
      post_id: {
        [Op.lt]: item
      }
    }
  }
  const posts = await Post.findAll({
    where,
    order: [['createdAt', order]],
    limit: parseInt(limit),
    offset: parseInt(item),
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
