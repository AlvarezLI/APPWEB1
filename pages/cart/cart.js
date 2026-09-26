/* ==========================================================
   Controlador del Carrito
   Página protegida: para usar el carrito hay que estar logueado.
   Muestra productos, cantidad, subtotal y total, y permite
   eliminar productos, vaciar el carrito y finalizar la compra.
   ========================================================== */

import { iniciarNavbar } from '../../components/navbar.js';
import { iniciarFooter } from '../../components/footer.js';
import { estaLogueado } from '../../utils/sesion.js';
import { obtenerCarrito } from '../../utils/storage.js';
import { eliminarDelCarrito, vaciarCarrito, calcularTotal } from '../../utils/carrito.js';
import { formatearPrecio } from '../../utils/formato.js';

const RAIZ = '../../';
const contenedor = document.querySelector('#carrito');

const filaComponent = (item) => {
  return `
    <tr>
      <td class="cart__td">
        <div class="cart__product">
          <img class="cart__img" src="${RAIZ}${item.imagen}" alt="${item.titulo}" />
          ${item.titulo}
        </div>
      </td>
      <td class="cart__td">${formatearPrecio(item.precio)}</td>
      <td class="cart__td">${item.cantidad}</td>
      <td class="cart__td">${formatearPrecio(item.precio * item.cantidad)}</td>
      <td class="cart__td">
        <button class="cart__remove" type="button" data-id="${item.id}" aria-label="Eliminar producto">&#215;</button>
      </td>
    </tr>`;
};

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="cart__empty">
        <p>Tu carrito está vacío.</p>
        <a href="${RAIZ}index.html" class="button">Ir a la tienda</a>
      </div>`;
    return;
  }

  const filas = carrito.map((item) => filaComponent(item)).join('');

  contenedor.innerHTML = `
    <div class="cart__table-wrap">
      <table class="cart__table">
        <thead>
          <tr>
            <th class="cart__th">Producto</th>
            <th class="cart__th">Precio</th>
            <th class="cart__th">Cantidad</th>
            <th class="cart__th">Subtotal</th>
            <th class="cart__th"></th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
    </div>

    <div class="cart__footer">
      <p class="cart__total">
        <span class="cart__total-label">Total</span>${formatearPrecio(calcularTotal(carrito))}
      </p>
      <div class="cart__actions">
        <button class="button button--ghost" id="btnVaciar" type="button">Vaciar carrito</button>
        <button class="button" id="btnComprar" type="button">Finalizar compra</button>
      </div>
    </div>`;

  agregarEventos(carrito);
};

const actualizarPagina = () => {
  renderizarCarrito();
  iniciarNavbar(RAIZ); // actualiza el contador del carrito
};

const agregarEventos = (carrito) => {
  document.querySelectorAll('.cart__remove').forEach((boton) => {
    boton.addEventListener('click', () => {
      eliminarDelCarrito(boton.dataset.id);
      actualizarPagina();
    });
  });

  document.querySelector('#btnVaciar').addEventListener('click', () => {
    vaciarCarrito();
    actualizarPagina();
  });

  document.querySelector('#btnComprar').addEventListener('click', () => {
    alert(`¡Gracias por tu compra! Total: ${formatearPrecio(calcularTotal(carrito))}`);
    vaciarCarrito();
    actualizarPagina();
  });
};

if (estaLogueado()) {
  iniciarNavbar(RAIZ);
  iniciarFooter();
  renderizarCarrito();
} else {
  alert('Tenés que iniciar sesión para ver tu carrito.');
  window.location.href = `${RAIZ}pages/login/login.html`;
}
