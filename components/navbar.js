/* ==========================================================
   Componente Navbar
   Se arma desde el array navLinks y se inserta en el <header>
   de todas las páginas, así no repetimos el HTML.
   ========================================================== */

import { obtenerUsuario } from '../utils/storage.js';
import { cerrarSesion } from '../utils/sesion.js';
import { contarProductos } from '../utils/carrito.js';

/* Rutas relativas a la raíz del proyecto */
export const navLinks = [
  { titulo: 'Inicio', link: 'index.html' },
  { titulo: 'Autos', link: 'pages/categorias/autos.html' },
  { titulo: 'Motos', link: 'pages/categorias/motos.html' },
  { titulo: 'Cuatriciclos', link: 'pages/categorias/cuatriciclos.html' }
];

const logo = `
  <svg class="navbar__logo" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="30" height="30" rx="7" fill="#0B1220" />
    <path d="M8 9l5 6-5 6" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M16 9l5 6-5 6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>`;

const iconoCarrito = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>`;

/* raiz: ruta desde la página actual hasta la raíz ('./' o '../../') */
export const navbarComponent = (raiz) => {
  const usuario = obtenerUsuario();
  const ruta = window.location.pathname;
  const cantidad = contarProductos();

  let links = '';
  navLinks.forEach((item) => {
    const esInicio = item.link === 'index.html' && ruta.endsWith('/');
    const clase = ruta.endsWith(item.link) || esInicio ? 'navbar__link navbar__link--active' : 'navbar__link';
    links += `<li><a href="${raiz}${item.link}" class="${clase}">${item.titulo}</a></li>`;
  });

  const saludo = usuario ? `<span class="navbar__user">Hola, ${usuario.email.split('@')[0]}</span>` : '';

  const botonSesion = usuario
    ? `<button class="navbar__button" id="btnLogout" type="button">Cerrar sesión</button>`
    : `<a href="${raiz}pages/login/login.html" class="navbar__button">Iniciar sesión</a>`;

  const contador = cantidad > 0 ? `<span class="navbar__badge">${cantidad}</span>` : '';

  return `
    <nav class="navbar">
      <a href="${raiz}index.html" class="navbar__brand" aria-label="RODEX — Inicio">
        ${logo}
        <span class="navbar__name">Rodex</span>
      </a>

      <div class="navbar__actions">
        ${saludo}
        <a href="${raiz}pages/cart/cart.html" class="navbar__cart" aria-label="Carrito">
          ${iconoCarrito}
          ${contador}
        </a>
        ${botonSesion}
        <button class="navbar__toggle" type="button" aria-label="Menú">
          <span class="navbar__toggle-line"></span>
          <span class="navbar__toggle-line"></span>
          <span class="navbar__toggle-line"></span>
        </button>
      </div>

      <ul class="navbar__links">${links}</ul>
    </nav>`;
};

/* Inserta la navbar y le agrega los eventos */
export const iniciarNavbar = (raiz) => {
  const header = document.querySelector('.header');
  header.innerHTML = navbarComponent(raiz);

  const toggle = document.querySelector('.navbar__toggle');
  const links = document.querySelector('.navbar__links');
  toggle.addEventListener('click', () => {
    links.classList.toggle('navbar__links--open');
  });

  const btnLogout = document.querySelector('#btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      cerrarSesion(raiz);
    });
  }
};
