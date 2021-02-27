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
          unique: true,
        },
        post_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        amount: {
          type: Sequelize.STRING(45),
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
  static associate(model) {
    this.belongsTo(model.User, { foreignKey: 'user_id', targetKey: 'user_id' });
    this.belongsTo(model.Post, { foreignKey: 'post_id', targetKey: 'post_id' });
  }
};
