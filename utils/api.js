/* Trae los productos de data/productos.json con fetch */

export const obtenerProductos = (raiz) => {
  return fetch(`${raiz}data/productos.json`)
    .then((respuesta) => respuesta.json());
};
