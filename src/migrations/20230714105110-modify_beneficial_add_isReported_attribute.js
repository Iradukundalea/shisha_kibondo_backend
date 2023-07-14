'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'beneficials', // table name
      'isReported', // new attribute
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
       );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'beneficials',
      'isReported',
    )
  }
};
