'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StockIn extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'nurseId' })
      this.belongsTo(models.ProductCategories, { foreignKey: 'productCategoryId' })
    }
  }
  StockIn.init({
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
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
},
  {
    sequelize,
    modelName: 'StockIn',
  });
  return StockIn;
};
