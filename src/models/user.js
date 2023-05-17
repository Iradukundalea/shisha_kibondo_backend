'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.UserSession, {
        foreignKey: 'userId',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(models.beneficial, {
        foreignKey: 'nurseId',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    } 
  }
  User.init({
    id: {
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    firstName: {
      type:DataTypes.STRING
    },
    lastName: {
      type:DataTypes.STRING
    },
    email:{
      type: DataTypes.STRING
    },
    telephone:{
      type: DataTypes.STRING
    },
    password:{
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM('Nurse', 'umujyanama wubuzima', 'other..'),
      allowNull: false,
      defaultValue: 'other..'},
      degree: {
        type: DataTypes.ENUM('primary', 'secondary', 'masters','Phd','other..'),
        allowNull: false,
        defaultValue: 'other..'},
      sex: {
        type: DataTypes.ENUM('male', 'female', 'other..'),
      allowNull: false,
      defaultValue: 'other..'
        },
    isVerified: {
      type:DataTypes.BOOLEAN,
      defaultValue: true
    },
    specialized:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:"users",
    modelName: 'User',
  });
  return User;
};