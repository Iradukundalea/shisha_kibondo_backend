'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'beneficials', // table name
        'height', // new attribute
        {
          type: Sequelize.DOUBLE,
          allowNull: true
        }
      ),

      queryInterface.addColumn(
        'beneficials', // table name
        'weight', // new attribute
        {
          type: Sequelize.DOUBLE,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'beneficials', // table name
        'MUAC', // new attribute
        {
          type: Sequelize.DOUBLE,
          allowNull: true
        }
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'beneficials',
        'height',
      ),
      queryInterface.removeColumn(
        'beneficials',
        'weight',
      ),
      queryInterface.removeColumn(
        'beneficials',
        'MUAC',
      ),
    ])
  }
};
