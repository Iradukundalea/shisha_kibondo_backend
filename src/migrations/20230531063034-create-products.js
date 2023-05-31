'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Products', {
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
    await queryInterface.dropTable('Products');
  }
};