'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey:'userId',
        as: 'owner',
      })
    }
  }
  Notifications.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
    userId: {
      type:DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
    },
    status: {
      type: DataTypes.ENUM(["delivered", "read"]),
      allowNull: false,
      defaultValue: "delivered",
    },
  }, {
    sequelize,
    modelName: 'Notifications',
  });
  return Notifications;
};