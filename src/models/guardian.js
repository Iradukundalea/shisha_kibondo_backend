'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guardian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.beneficial,{ foreignKey:'beneficialId' })
    }
  }
  Guardian.init({
    id: {
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    nurseId:{
      type:DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
    },
    identityNumber: {
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
    sex: {
      type: DataTypes.ENUM('male', 'female', 'other..'),
      allowNull: false,
      defaultValue: 'other..'
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
    beneficialId:{
      type:DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'beneficials',
        key: 'id'
      },
    },
  }, {
    sequelize,
    modelName: 'Guardian',
  });
  return Guardian;
};