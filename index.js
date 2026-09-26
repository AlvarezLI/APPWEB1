/* ==========================================================
   Controlador del Home
   Muestra los primeros 3 productos de cada categoría.
   ========================================================== */

import { iniciarNavbar } from './components/navbar.js';
import { iniciarFooter } from './components/footer.js';
import { renderizarCards } from './components/card.js';
import { obtenerProductos } from './utils/api.js';

const RAIZ = './';

iniciarNavbar(RAIZ);
iniciarFooter();

const contenedor = document.querySelector('#destacados');

obtenerProductos(RAIZ)
  .then((datos) => {
    const destacados = datos.autos.slice(0, 3).concat(
      datos.motos.slice(0, 3),
      datos.cuatriciclos.slice(0, 3)
    );
    renderizarCards(contenedor, destacados, RAIZ);
  })
  .catch(() => {
    contenedor.innerHTML = `<p class="products__message">No se pudieron cargar los productos.</p>`;
  });
