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
  static associate(db) {
    // TODO(@mango906): User완성되면 User 외래키로 묶기
  }
};
