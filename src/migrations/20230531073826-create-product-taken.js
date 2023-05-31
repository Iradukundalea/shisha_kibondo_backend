'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Product_takens', {
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Product_takens');
  }
};