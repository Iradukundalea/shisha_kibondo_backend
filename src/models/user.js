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
      this.hasMany(models.Guardian,{foreignKey:'nurseId'});
      this.hasMany(models.ProductCategories, { foreignKey:'nurseId' });
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
      type: DataTypes.ENUM('Nurse', 'umujyanama wubuzima','admin'),
      allowNull: false,
      },
      degree:{
        type: DataTypes.STRING
      },
      sex: {
        type: DataTypes.ENUM('male', 'female','other'),
      allowNull: false,
        },
    isVerified: {
      type:DataTypes.BOOLEAN,
      defaultValue: true
    },
    specialized:{
      type:DataTypes.STRING,
      allowNull:false
    },
    province:{
      type:DataTypes.STRING,
      allowNull:false
     },
     district:{
       type:DataTypes.STRING,
       allowNull:false
     },
     sector:{
       type:DataTypes.STRING,
       allowNull:false
     },
     cell:{
       type:DataTypes.STRING,
       allowNull:false
     },
     village:{
       type:DataTypes.STRING,
       allowNull:false
     },
    
  }, {
    sequelize,
    tableName:"users",
    modelName: 'User',
  });
  return User;
};