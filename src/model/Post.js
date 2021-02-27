const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            // this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });
        }
    }
    Post.init({
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
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Post',
        tableName: 'post',
        timestamps: false,
        paranoid: true,
        deletedAt: 'deleted_at',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    return Post;
};
