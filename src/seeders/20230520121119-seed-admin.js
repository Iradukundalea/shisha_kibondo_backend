'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt= require('bcrypt')
const{v4:uuidv4}  = require ('uuid')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: uuidv4() ,
      firstName: 'IRADUKUNDA',
      lastName: 'Lea',
      email:"mugisha134emmy@gmail.com",
      password: await bcrypt.hash("Mugemmanuel1Q!",10),
      telephone:"0737440507",
      role:"admin",
      degree:"phd",
      sex:"male",
      isVerified:"true",
      specialized:"database",
      createdAt: new Date(),
      updatedAt: new Date()
     },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
