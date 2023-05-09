'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
      },
      firstName: {
        type:DataTypes.STRING
      },
      lastName: {
        type:DataTypes.STRING
      },
      email:{
        type: DataTypes.STRING
      },
      telephone:{
        type: DataTypes.STRING
      },
      password:{
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.ENUM('Nurse', 'umujyanama wubuzima', 'other..'),
        allowNull: false,
        defaultValue: 'other..'},
        degree: {
          type: DataTypes.ENUM('primary', 'secondary', 'masters','Phd','other..'),
          allowNull: false,
          defaultValue: 'other..'},
        sex: {
          type:DataTypes.STRING,
          allowNull:false
          },
      isVerified: {
        type:DataTypes.BOOLEAN,
        defaultValue: false
      },
      specialized:{
        type:DataTypes.STRING,
        allowNull:false
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
    await queryInterface.dropTable('users');
  }
};