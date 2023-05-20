'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Guardians', {
      id: {
        allowNull: false,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
      },
      identityNumber:{
        type:DataTypes.DECIMAL,
        allowNull:false,
      },
      firstName: {
        type:DataTypes.STRING
      },
      lastName: {
        type:DataTypes.STRING
      },
      telephone:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      sex:{
        type: DataTypes.ENUM('male', 'female', 'other..'),
        allowNull: false,
        defaultValue: 'other..'
      },
      province:{
       type:DataTypes.STRING,
       allowNull:false
      },
      district:{
        type:DataTypes.STRING,
        allowNull:false
      },
      sector:{
        type:DataTypes.STRING,
        allowNull:false
      },
      cell:{
        type:DataTypes.STRING,
        allowNull:false
      },
      village:{
        type:DataTypes.STRING,
        allowNull:false
      },
      beneficialId:{
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
    await queryInterface.dropTable('Guardians');
  }
};