'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SMS', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      messageid: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      receipient: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      message: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      time: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      totalmessages: { 
        type: Sequelize.INTEGER, 
        allowNull: false 
      },
      status: { 
        type: Sequelize.INTEGER,
        allowNull: false 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SMS');
  }
};