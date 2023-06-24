'use strict';
const {
  Model, ForeignKeyConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class beneficial extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:'nurseId', as:'nurse'})
      this.hasMany(models.Guardian, {
        foreignKey: 'beneficialId',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        as: 'guardians'
      });
      this.hasMany(models.StockOut, {
        foreignKey: 'beneficialId',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        
      });
    }
  }
  beneficial.init({
    id: {
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    identityNumber:{
      type:DataTypes.DECIMAL,
      allowNull:false,
    },
    firstName: {
      type:DataTypes.STRING
    },
    lastName: {
      type:DataTypes.STRING
    },
    telephone:{
      type:DataTypes.STRING,
      allowNull:false
    },
    sex:{
      type: DataTypes.ENUM('male', 'female', 'other..'),
      allowNull: false,
      defaultValue: 'other..'
    },
    status:{
      type: DataTypes.ENUM('pregnant', 'children'),
      allowNull: false,
      defaultValue: 'pregnant'
    },
    healthCenter:{
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
    nurseId:{
      type:DataTypes.UUID,
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
    }
  }, {
    sequelize,
    modelName: 'beneficial',
  });
  return beneficial;
};