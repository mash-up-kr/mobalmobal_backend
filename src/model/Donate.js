const Sequelize = require('sequelize');

module.exports = class Donate extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        donate_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        post_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        amount: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        modelName: 'Donate',
        tableName: 'donate',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
    this.belongsTo(models.Post, { foreignKey: 'post_id', targetKey: 'post_id' });
  }
};
