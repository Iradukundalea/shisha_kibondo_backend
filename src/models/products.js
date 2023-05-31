'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:'nurse_id'})
      this.hasMany(models.Product_taken, {
        foreignKey: 'productId',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

    }
  }
  Products.init({
    id: {
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    Name: {
      type:DataTypes.STRING
    },
 
  quantity :
  {
    type:DataTypes.INTEGER
  },
  date:{
    type:DataTypes.STRING
  },
  expired_date:{
    type:DataTypes.STRING
  },
  nurse_id:{
    type:DataTypes.UUID,
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
  }
},
  {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};