'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategories extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'nurseId'} )
      this.hasMany(models.StockOut, { foreignKey: 'productCategoryId', as: 'stockOut'})
      this.hasMany(models.StockIn, { foreignKey: 'productCategoryId', as: 'stockIn'})
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
      allowNull: true,
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
