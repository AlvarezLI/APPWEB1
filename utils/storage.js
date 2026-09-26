/* ==========================================================
   Acceso al almacenamiento del navegador
   - sessionStorage: usuario logueado (se borra al cerrar la pestaña)
   - localStorage:   productos del carrito (persisten)
   ========================================================== */

const CLAVE_USUARIO = 'usuario';
const CLAVE_CARRITO = 'carrito';

/* ---------- Usuario (sessionStorage) ---------- */

export const guardarUsuario = (usuario) => {
  sessionStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
};

export const obtenerUsuario = () => {
  const datos = sessionStorage.getItem(CLAVE_USUARIO);
  return datos ? JSON.parse(datos) : null;
};

export const eliminarUsuario = () => {
  sessionStorage.removeItem(CLAVE_USUARIO);
};

/* ---------- Carrito (localStorage) ---------- */

export const obtenerCarrito = () => {
  const datos = localStorage.getItem(CLAVE_CARRITO);
  return datos ? JSON.parse(datos) : [];
};

export const guardarCarrito = (carrito) => {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
};
