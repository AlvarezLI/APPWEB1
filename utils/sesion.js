/* ==========================================================
   Sesión del usuario (login simulado)
   Por ahora no se validan las claves contra una base de datos:
   solo se guarda el usuario en sessionStorage.
   ========================================================== */

import { guardarUsuario, obtenerUsuario, eliminarUsuario } from './storage.js';

export const estaLogueado = () => {
  return obtenerUsuario() !== null;
};

export const iniciarSesion = (email) => {
  guardarUsuario({ email: email });
};

/* Al cerrar sesión se redirige al login */
export const cerrarSesion = (raiz) => {
  eliminarUsuario();
  window.location.href = `${raiz}pages/login/login.html`;
};
