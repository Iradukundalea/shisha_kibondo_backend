'use strict';

/** @type {import('sequelize-cli').Migration} */
const{ v4:uuidv4 }  = require ('uuid')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductCategories', [
      {
        id: uuidv4(),
        name: 'shishakibondo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductCategories', null, {});
  }
};
