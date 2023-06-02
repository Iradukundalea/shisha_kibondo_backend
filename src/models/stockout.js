'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StockOut extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'nurseId' })
      this.belongsTo(models.ProductCategories, { foreignKey: 'productCategoryId' })
      this.belongsTo(models.beneficial, { foreignKey: 'beneficialId' })
      this.belongsTo(
        models.ProductCategories, { 
        foreignKey: 'productCategoryId', 
        as: 'category'
      })
    }
  }
  StockOut.init({
    id: {
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    productCategoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'ProductCategories',
        key: 'id'
      }
    },
    beneficialId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'beneficials',
        key: 'id'
      }
    },
    nurseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    quantity: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
},
  {
    sequelize,
    modelName: 'StockOut',
  });
  return StockOut;
};
