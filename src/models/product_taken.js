'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_taken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
      this.belongsTo(models.beneficial,{foreignKey:'beneficialId'})
      this.belongsTo(models.User,{foreignKey:'nurse_id'})
      this.belongsTo(models.Products,{foreignKey:'productId'})




      
    }
  }
  Product_taken.init({
    id: {
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    date: {
      type:DataTypes.STRING
    },
    quantity:{
      type:DataTypes.INTEGER
    },
    nurse_id:{
      type:DataTypes.UUID,
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
    },
    beneficialId:{
      type:DataTypes.UUID,
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
    },
    productId:{
      type:DataTypes.UUID,
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
    }
  }, {
    sequelize,
    modelName: 'Product_taken',
  });
  return Product_taken;
};