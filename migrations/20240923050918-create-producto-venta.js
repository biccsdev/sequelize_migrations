'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductoVenta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idventa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Venta', // Nombre de la tabla de la relación
          key: 'id', // Clave primaria de la tabla de la relación
        },
      },

      idproducto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Productos', // Nombre de la tabla de la relación
          key: 'id', // Clave primaria de la tabla de la relación
        },
      },

      cantidadvendida: {
        type: Sequelize.INTEGER
      },
      subtotal: {
        type: Sequelize.DECIMAL
      },
      precioVenta: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('ProductoVenta');
  }
};