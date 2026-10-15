/* Sesión del usuario (login simulado, se guarda en sessionStorage) */

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
