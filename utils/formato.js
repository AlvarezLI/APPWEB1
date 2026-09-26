/* Formatea un número como precio en pesos: 118000000 -> $118.000.000 */
export const formatearPrecio = (precio) => {
  return `$${precio.toLocaleString('es-AR')}`;
};
