'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductoVenta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define relación muchos a uno con Venta
      ProductoVenta.belongsTo(models.Venta, { foreignKey: 'idventa' });
      // Define relación muchos a uno con Producto
      ProductoVenta.belongsTo(models.Producto, { foreignKey: 'idproducto' });
    }

  }
  ProductoVenta.init({
    idventa: DataTypes.INTEGER,
    idproducto: DataTypes.INTEGER,
    cantidadvendida: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL,
    precioVenta: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ProductoVenta',
  });
  return ProductoVenta;
};