const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        post_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        goal: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        current_amount: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        started_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        end_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        post_image: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Post',
        tableName: 'post',
        underscored: true,
        timestamps: true,
        paranoid: true,
        deletedAt: 'deleted_at',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'user_id', targetKey: 'user_id' });
    this.hasMany(models.Donate, { as: 'post', foreignKey: 'post_id', sourceKey: 'post_id' });
  }
};
