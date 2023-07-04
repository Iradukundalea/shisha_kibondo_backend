'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SMS extends Model {
    static associate() { }
  }
  SMS.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    messageid: { type: DataTypes.STRING, allowNull: false },
    receipient: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
    time: { type: DataTypes.STRING, allowNull: false },
    totalmessages: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'SMS',
    tableName: 'SMS',
  });
  return SMS;
};
