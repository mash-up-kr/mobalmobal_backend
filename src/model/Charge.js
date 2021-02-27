const Sequelize = require('sequelize');

module.exports = class Charge extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        charge_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        is_charge: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        modelName: 'Charge',
        tableName: 'charge',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
  }
};
