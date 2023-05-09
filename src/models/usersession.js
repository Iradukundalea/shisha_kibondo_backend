'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'userId', onDelete:'CASCADE'})

    }
  }
  UserSession.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId:{ 
     type:DataTypes.STRING,
     allowNull:false
    },
    token: DataTypes.STRING(10000),
    loginIp: DataTypes.STRING,
    deviceType: DataTypes.JSON,
    lastActivity: DataTypes.STRING
  },
   {
    sequelize,
    tableName: 'userSessions',
    modelName: 'UserSession',
  });
  return UserSession;
};