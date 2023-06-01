'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategories extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'nurseId'} )
    }
  }
  ProductCategories.init({
    id: {
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    nurseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
},
  {
    sequelize,
    modelName: 'ProductCategories',
  });
  return ProductCategories;
};
