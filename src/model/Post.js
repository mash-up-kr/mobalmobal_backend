const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            // this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });
        }
    }
    Post.init({
        post_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        goal: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        started_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        post_image: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Post',
        tableName: 'post',
        underscored: true,
        timestamps: true,
        paranoid: true,
        deletedAt: 'deleted_at',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    return Post;
};
