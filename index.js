const { sequelize } = require('../models');
const ProductoDAO = require('../dataAccess/productoDAO');
const VentaDAO = require('../dataAccess/ventaDAO');
const ProductoVentaDAO = require('../dataAccess/productoVentaDAO');

// Función asincrónica para realizar transacciones
async function realizarTransacciones() {
  try {
    // Iniciar una transacción en la base de datos
    await sequelize.sync();

    // Crear un producto
    const producto = await ProductoDAO.crearProducto('Producto 1', 15.99, 50);
    console.log('Producto creado:', producto.toJSON());

    // Crear una venta
    const venta = await VentaDAO.crearVenta(100, 15.0);
    console.log('Venta creada:', venta.toJSON());

    // Crear un productoVenta asociado a la venta y el producto
    const productoVenta = await ProductoVentaDAO.crearProductoVenta(
      venta.id,     // ID de la venta
      producto.id,  // ID del producto
      2,            // Cantidad vendida
      31.98,        // Subtotal
      15.99         // Precio de venta
    );
    console.log('ProductoVenta creado:', productoVenta.toJSON());

    // Obtener todos los productos
    const productos = await ProductoDAO.obtenerProductos();
    console.log('Productos:', productos);

    // Obtener todas las ventas
    const ventas = await VentaDAO.obtenerVentas();
    console.log('Ventas:', ventas);

    // Actualizar un producto
    await ProductoDAO.actualizarProducto(producto.id, 'Producto Actualizado', 15.99, 50);
    console.log('Producto actualizado');

    // Eliminar una venta
    await VentaDAO.eliminarVenta(venta.id);
    console.log('Venta eliminada');

    // Obtener todas las ventas nuevamente
    const ventasActualizadas = await VentaDAO.obtenerVentas();
    console.log('Ventas actualizadas:', ventasActualizadas);
  } catch (error) {
    console.error('Error en las transacciones:', error);
  } finally {
    // Cerrar la conexión a la base de datos cuando todas las transacciones han terminado
    await sequelize.close();
  }
}

// Ejecutar las transacciones
realizarTransacciones();

// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
