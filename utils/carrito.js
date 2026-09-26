/* ==========================================================
   Lógica del carrito
   Cada ítem se guarda como { id, titulo, precio, imagen, cantidad }
   ========================================================== */

import { obtenerCarrito, guardarCarrito } from './storage.js';

export const agregarAlCarrito = (producto, cantidad) => {
  const carrito = obtenerCarrito();

  /* Buscamos si el producto ya está en el carrito */
  const ids = carrito.map((item) => item.id);
  const indice = ids.indexOf(producto.id);

  if (indice === -1) {
    carrito.push({
      id: producto.id,
      titulo: producto.titulo,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: cantidad
    });
  } else {
    carrito[indice].cantidad = carrito[indice].cantidad + cantidad;
  }

  guardarCarrito(carrito);
};

export const eliminarDelCarrito = (id) => {
  const carrito = obtenerCarrito();
  const carritoNuevo = carrito.filter((item) => item.id !== id);
  guardarCarrito(carritoNuevo);
};

export const vaciarCarrito = () => {
  guardarCarrito([]);
};

export const calcularTotal = (carrito) => {
  return carrito.reduce((acumulador, item) => acumulador + item.precio * item.cantidad, 0);
};

/* Cantidad total de unidades (para el contador de la navbar) */
export const contarProductos = () => {
  return obtenerCarrito().reduce((acumulador, item) => acumulador + item.cantidad, 0);
};
