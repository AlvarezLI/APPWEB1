/* ==========================================================
   Obtención de datos
   Trae los productos del archivo JSON usando fetch.
   Retorna una promesa con el objeto { autos: [], motos: [], cuatriciclos: [] }
   ========================================================== */

export const obtenerProductos = (raiz) => {
  return fetch(`${raiz}data/productos.json`)
    .then((respuesta) => respuesta.json());
};
