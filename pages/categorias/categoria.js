/* ==========================================================
   Controlador de las páginas de categoría
   Lo usan autos.html, motos.html y cuatriciclos.html.
   La categoría se toma del nombre del archivo: .../motos.html -> 'motos'
   ========================================================== */

import { iniciarNavbar } from '../../components/navbar.js';
import { iniciarFooter } from '../../components/footer.js';
import { renderizarCards } from '../../components/card.js';
import { obtenerProductos } from '../../utils/api.js';

const RAIZ = '../../';

iniciarNavbar(RAIZ);
iniciarFooter();

const categoria = window.location.pathname.split('/').pop().replace('.html', '');
const contenedor = document.querySelector('#productos');

obtenerProductos(RAIZ)
  .then((datos) => {
    renderizarCards(contenedor, datos[categoria], RAIZ);
  })
  .catch(() => {
    contenedor.innerHTML = `<p class="products__message">No se pudieron cargar los productos.</p>`;
  });
