const Post = require('../model/Post');
const User = require('../model/User');
const { Op } = require('sequelize');
const moment = require('moment');

const PostStatus = {
  BEFORE: 'BEFORE',
  IN_PROGRESS: 'IN_PROGRESS',
  EXPIRED: 'EXPIRED',
};

const PostStatusFilter = {
  [PostStatus.BEFORE]: {
    started_at: {
      [Op.gte]: moment().tz('Asia/Seoul').toDate(),
    },
  },
  [PostStatus.IN_PROGRESS]: {
    started_at: {
      [Op.lte]: moment().tz('Asia/Seoul').toDate(),
    },
    end_at: {
      [Op.gte]: moment().tz('Asia/Seoul').toDate(),
    },
  },
  [PostStatus.EXPIRED]: {
    started_at: {
      [Op.lte]: moment().tz('Asia/Seoul').toDate(),
    },
    end_at: {
      [Op.lte]: moment().tz('Asia/Seoul').toDate(),
    },
  },
};

const getAll = async ({ item, limit, order }) => {
  let where = {
    started_at: {
      [Op.lte]: moment().tz('Asia/Seoul').toDate(),
    },
  };
  if (item === -1) {
    item = await Post.findOne({
      attributes: ['post_id'],
      order: [['post_id', order]],
      limit: 1,
    });
    item = item.post_id;
  }
  if (order === 'DESC') {
    where.post_id = {
      [Op.lte]: item,
    };
  }
  const posts = await Post.findAll({
    where,
    order: [['post_id', order]],
    limit: parseInt(limit),
  });
  return posts;
};

const getById = async (post_id) => {
  const post = await Post.findOne({
    where: {
      post_id,
    },
    include: [{ model: User, as: 'user' }],
  });

  return post;
};

const addPost = async (post) => {
  const postDoc = new Post(post);
  await postDoc.save();
  return postDoc;
};

const myPost = async (status, userId) => {
  const posts = await Post.findAll({
    where: {
      ...generatePostFilter(status),
      user_id: userId,
    },
    order: [['createdAt', 'DESC']],
    include: [{ model: User, as: 'user' }],
  });

  return posts;
};

const generatePostFilter = (status) => {
  let filter = {};

  if (!status) {
    return filter;
  }

  if (status) {
    filter = { ...PostStatusFilter[status] };
  }

  return filter;
};

module.exports = {
  getAll,
  getById,
  addPost,
  myPost,
  generatePostFilter,
};
