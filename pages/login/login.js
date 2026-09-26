/* ==========================================================
   Controlador del Login (simulado)
   Solo se chequea que los campos estén completos; la validación
   real de usuario y contraseña se hará con un backend en AW2.
   ========================================================== */

import { iniciarNavbar } from '../../components/navbar.js';
import { iniciarSesion } from '../../utils/sesion.js';

const RAIZ = '../../';

iniciarNavbar(RAIZ);

const form = document.querySelector('#loginForm');
const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const mensajeError = document.querySelector('#loginError');

const mostrarError = (mensaje) => {
  mensajeError.textContent = mensaje;
  mensajeError.classList.add('form__error--visible');
};

const ocultarError = () => {
  mensajeError.classList.remove('form__error--visible');
};

form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  if (email === '' || password === '') {
    mostrarError('Completá el correo y la contraseña.');
    return;
  }

  if (email.indexOf('@') === -1) {
    mostrarError('Ingresá un correo electrónico válido.');
    return;
  }

  iniciarSesion(email);
  window.location.href = `${RAIZ}index.html`; // redirige al home
});

inputEmail.addEventListener('keypress', ocultarError);
inputPassword.addEventListener('keypress', ocultarError);
