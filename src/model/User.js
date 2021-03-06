const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        nickname: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        phone_number: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        account_number: {
          type: Sequelize.STRING(60),
          allowNull: true,
        },
        bank_name: {
          type: Sequelize.STRING(60),
          allowNull: true,
        },
        profile_image: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        cash: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        provider: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        firestore_id: {
          type: Sequelize.STRING(300),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        modelName: 'User',
        tableName: 'user',
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Post, { foreignKey: 'user_id', sourceKey: 'user_id' });
    this.hasMany(models.Charge, { foreignKey: 'user_id', sourceKey: 'user_id' });
    this.hasMany(models.Donate, { foreignKey: 'user_id', sourceKey: 'user_id' });
  }
};
