'use strict';
const {
  Model, ForeignKeyConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class beneficial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:'nurseId'})
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
      type:DataTypes.INTEGER,
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