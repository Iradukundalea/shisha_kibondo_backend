'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StockOuts', {
      id: {
        allowNull: false,
        defaultValue:Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      productCategoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'ProductCategories',
          key: 'id'
        }
      },
      beneficialId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'beneficials',
          key: 'id'
        }
      },
      nurseId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      quantity: {
        type:Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('StockOuts');
  }
};