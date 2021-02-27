const Post = require('../model/Post');
const { Op } = require('sequelize');

const operator = {
    "DESC": Op.lt,
    "ASC": Op.gt  
}

const getAll = async ({ item, limit, order }) => {
    console.log(item)
    const posts = await Post.findAll({
        where: {
            createdAt: {
                [operator[order]]: item
            }
        },
        order: [['createdAt', order]],
        limit
    });
    return posts;
};

module.exports = {
    getAll
}