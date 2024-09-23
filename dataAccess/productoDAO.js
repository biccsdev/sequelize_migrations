const { Producto } = require('..');

class ProductoDAO {
    constructor() { }

    async crearProducto(nombre, precio, cantidad) {
        try {
            const producto = await Producto.create({ nombre, precio, cantidad });
            return producto;
        } catch (error) {
            throw error;
        }
    }

    async obtenerProductos() {
        try {
            const productos = await Producto.findAll();
            return productos;
        } catch (error) {
            throw error;
        }
    }

    async obtenerProductoPorId(id) {
        try {
            const producto = await Producto.findByPk(id);
            return producto;
        } catch (error) {
            throw error;
        }
    }

    async actualizarProducto(id, nombre, precio, cantidad) {
        try {
            await Producto.update({ nombre, precio, cantidad }, { where: { id } });
            const productoActualizado = await Producto.findByPk(id);
            return productoActualizado;
        } catch (error) {
            throw error;
        }
    }

    async eliminarProducto(id) {
        try {
            const producto = await Producto.findByPk(id);
            if (!producto) {
                throw new Error('Producto no encontrado');
            }
            await producto.destroy();
            return 'Producto eliminado con éxito';
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductoDAO();