/* ==========================================================
   Componente Card de producto
   Muestra imagen, título, descripción, precio, control de
   cantidad (+ / -) y botón para agregar al carrito.
   ========================================================== */

import { formatearPrecio } from '../utils/formato.js';
import { agregarAlCarrito } from '../utils/carrito.js';
import { estaLogueado } from '../utils/sesion.js';
import { iniciarNavbar } from './navbar.js';

export const cardComponent = (producto, raiz) => {
  return `
    <article class="card" id="${producto.id}">
      <img class="card__img" src="${raiz}${producto.imagen}" alt="${producto.titulo}" loading="lazy" />
      <h3 class="card__title">${producto.titulo}</h3>
      <p class="card__desc">${producto.descripcion}</p>
      <p class="card__price">${formatearPrecio(producto.precio)}</p>
      <div class="card__footer">
        <div class="card__qty">
          <button class="card__qty-btn card__qty-btn--menos" type="button" aria-label="Restar uno">&#8722;</button>
          <span class="card__qty-value">1</span>
          <button class="card__qty-btn card__qty-btn--mas" type="button" aria-label="Sumar uno">+</button>
        </div>
        <button class="button card__button" type="button">Agregar al carrito</button>
      </div>
    </article>`;
};

/* Dibuja las cards dentro del contenedor y les agrega los eventos */
export const renderizarCards = (contenedor, productos, raiz) => {
  contenedor.innerHTML = productos.map((producto) => cardComponent(producto, raiz)).join('');

  productos.forEach((producto) => {
    const card = document.getElementById(producto.id);
    const valor = card.querySelector('.card__qty-value');
    const btnMenos = card.querySelector('.card__qty-btn--menos');
    const btnMas = card.querySelector('.card__qty-btn--mas');
    const btnAgregar = card.querySelector('.card__button');

    btnMenos.addEventListener('click', () => {
      const cantidad = parseInt(valor.textContent);
      valor.textContent = Math.max(1, cantidad - 1);
    });

    btnMas.addEventListener('click', () => {
      const cantidad = parseInt(valor.textContent);
      valor.textContent = cantidad + 1;
    });

    btnAgregar.addEventListener('click', () => {
      /* Para usar el carrito hay que estar logueado */
      if (!estaLogueado()) {
        alert('Tenés que iniciar sesión para agregar productos al carrito.');
        window.location.href = `${raiz}pages/login/login.html`;
        return;
      }

      agregarAlCarrito(producto, parseInt(valor.textContent));
      valor.textContent = 1;
      iniciarNavbar(raiz); // actualiza el contador del carrito

      btnAgregar.textContent = '✓ Agregado';
      setTimeout(() => {
        btnAgregar.textContent = 'Agregar al carrito';
      }, 1500);
    });
  });
};
