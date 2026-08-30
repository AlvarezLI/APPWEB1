/* ==========================================================
   RODEX — Carrito de compras
   Los ítems se persisten en localStorage por usuario logueado,
   así el carrito sobrevive al cierre de la pestaña.
   ========================================================== */

const _C = 'rodex_cart';

/* Clave del carrito según el usuario en sesión */
function _cartKey() {
  const session = typeof getSession === 'function' ? getSession() : null;
  return session ? _C + ':' + session.email : _C;
}

function cartGet() {
  try { return JSON.parse(localStorage.getItem(_cartKey())) || []; } catch { return []; }
}

function cartSave(items) {
  try { localStorage.setItem(_cartKey(), JSON.stringify(items)); } catch { /* storage lleno */ }
}

function cartAdd(id, name, price, qty) {
  qty = Math.max(1, parseInt(qty, 10) || 1);

  const items    = cartGet();
  const existing = items.find(function (i) { return i.id === id; });

  if (existing) {
    existing.qty = Math.min(99, existing.qty + qty);
  } else {
    items.push({ id: id, name: name, price: Number(price) || 0, qty: qty });
  }

  cartSave(items);
  updateCartBadge();
}

function cartSetQty(id, qty) {
  const items = cartGet();
  const item  = items.find(function (i) { return i.id === id; });
  if (!item) return;
  item.qty = Math.min(99, Math.max(1, parseInt(qty, 10) || 1));
  cartSave(items);
  updateCartBadge();
}

function cartRemove(id) {
  cartSave(cartGet().filter(function (i) { return i.id !== id; }));
  updateCartBadge();
}

function cartClear() {
  cartSave([]);
  updateCartBadge();
}

function cartCount() {
  return cartGet().reduce(function (sum, i) { return sum + i.qty; }, 0);
}

function cartTotal() {
  return cartGet().reduce(function (sum, i) { return sum + i.price * i.qty; }, 0);
}

function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (!badge) return;
  const count = cartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
