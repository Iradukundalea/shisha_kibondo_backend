'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        defaultValue:Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      nurseId:{
        type:Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      beneficialId:{
        type:Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'beneficials',
          key: 'id'
        },
      },
      status: {
        type: Sequelize.ENUM('scheduled', 'ongoing', 'no show', 'completed'),
        allowNull: false,
        defaultValue: 'scheduled'
      },
      appointmentDate: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Appointments');
  }
};