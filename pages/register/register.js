/* ==========================================================
   Controlador del Registro (simulado)
   Se validan los campos del formulario y se redirige al login.
   Todavía no se guardan usuarios: eso se hará con un backend en AW2.
   ========================================================== */

import { iniciarNavbar } from '../../components/navbar.js';

const RAIZ = '../../';

iniciarNavbar(RAIZ);

const form = document.querySelector('#registerForm');
const mensajeError = document.querySelector('#registerError');
const campos = ['nombre', 'apellido', 'email', 'password', 'fechaNacimiento'];

const mostrarError = (mensaje) => {
  mensajeError.textContent = mensaje;
  mensajeError.classList.add('form__error--visible');
};

const ocultarError = () => {
  mensajeError.classList.remove('form__error--visible');
};

form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nombre = document.querySelector('#nombre').value.trim();
  const apellido = document.querySelector('#apellido').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const fechaNacimiento = document.querySelector('#fechaNacimiento').value;

  if (nombre === '' || apellido === '' || email === '' || password === '' || fechaNacimiento === '') {
    mostrarError('Completá todos los campos.');
    return;
  }

  if (email.indexOf('@') === -1) {
    mostrarError('Ingresá un correo electrónico válido.');
    return;
  }

  if (password.length < 8) {
    mostrarError('La contraseña debe tener al menos 8 caracteres.');
    return;
  }

  alert(`¡Cuenta creada, ${nombre}! Ahora podés iniciar sesión.`);
  window.location.href = `${RAIZ}pages/login/login.html`;
});

campos.forEach((id) => {
  document.querySelector(`#${id}`).addEventListener('change', ocultarError);
});
