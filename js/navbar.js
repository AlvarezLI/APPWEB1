/* ==========================================================
   RODEX — Componente Navbar
   La navbar se genera desde un único array de configuración,
   así todas las páginas comparten exactamente el mismo menú.
   ========================================================== */

const NAV_PAGES = [
  { href: 'index.html',        label: 'Inicio' },
  { href: 'autos.html',        label: 'Autos' },
  { href: 'motos.html',        label: 'Motos' },
  { href: 'cuatriciclos.html', label: 'Cuatriciclos' },
];

/* Logo de la tienda (SVG inline, sin depender de imágenes externas) */
const NAV_LOGO =
  '<svg class="nav-logo" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<rect width="30" height="30" rx="7" fill="#0B1220"/>' +
    '<path d="M8 9l5 6-5 6" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M16 9l5 6-5 6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>';

function renderNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;

  const path = window.location.pathname.replace(/\\/g, '/');
  const root = _root();

  const linksHTML = NAV_PAGES.map(function (page) {
    const filename = page.href.split('/').pop();
    const isActive = path.endsWith('/' + filename);
    return '<li><a href="' + root + page.href + '"' +
           (isActive ? ' class="active"' : '') + '>' + page.label + '</a></li>';
  }).join('');

  const session  = getSession();
  const userHTML = session
    ? '<span class="nav-user">Hola, <strong>' + escapeHtml(session.nombre) + '</strong></span>'
    : '';

  nav.innerHTML =
    '<a href="' + root + 'index.html" class="nav-brand" aria-label="RODEX — Inicio">' +
      NAV_LOGO +
      '<span class="nav-brand-name">Rodex</span>' +
    '</a>' +
    '<ul class="nav-links">' + linksHTML + '</ul>' +
    userHTML +
    '<a href="' + root + 'cart.html" class="nav-cart" aria-label="Carrito">' +
      '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
        '<circle cx="9" cy="21" r="1"/>' +
        '<circle cx="20" cy="21" r="1"/>' +
        '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>' +
      '</svg>' +
      '<span class="cart-badge"></span>' +
    '</a>' +
    '<button class="nav-toggle" aria-label="Menú" aria-expanded="false">' +
      '<span></span><span></span><span></span>' +
    '</button>' +
    '<button class="btn-logout" onclick="authLogout()">Cerrar sesión</button>';

  initNav();
  if (typeof updateCartBadge === 'function') updateCartBadge();
}
