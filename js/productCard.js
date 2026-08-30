/* ==========================================================
   RODEX — Componente Card de Producto
   Los productos se traen con fetch() desde data/products.json
   y se renderizan dinámicamente en cada página de categoría.
   ========================================================== */

const DATA_URL = '../data/products.json';

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';

  card.innerHTML =
    '<div class="product-img">' +
      '<img src="../' + escapeHtml(product.img) + '" alt="' + escapeHtml(product.title) + '" loading="lazy" />' +
    '</div>' +
    '<h3 class="product-name">' + escapeHtml(product.title) + '</h3>' +
    '<p class="product-desc">' + escapeHtml(product.desc) + '</p>' +
    '<p class="product-price">' + formatPrice(product.price) + '</p>' +
    '<div class="product-qty">' +
      '<button class="qty-btn qty-minus" aria-label="Disminuir cantidad">&#8722;</button>' +
      '<span class="qty-value">1</span>' +
      '<button class="qty-btn qty-plus" aria-label="Aumentar cantidad">+</button>' +
    '</div>' +
    '<button class="product-btn">Agregar al carrito</button>';

  let qty = 1;
  const minus   = card.querySelector('.qty-minus');
  const plus    = card.querySelector('.qty-plus');
  const qtySpan = card.querySelector('.qty-value');
  const addBtn  = card.querySelector('.product-btn');

  minus.addEventListener('click', function () {
    if (qty > 1) {
      qty--;
      qtySpan.textContent = qty;
    }
  });

  plus.addEventListener('click', function () {
    if (qty < 99) {
      qty++;
      qtySpan.textContent = qty;
    }
  });

  addBtn.addEventListener('click', function () {
    cartAdd(product.id, product.title, product.price, qty);
    addBtn.textContent = '✓ Agregado';
    addBtn.classList.add('added');
    qty = 1;
    qtySpan.textContent = 1;
    setTimeout(function () {
      addBtn.textContent = 'Agregar al carrito';
      addBtn.classList.remove('added');
    }, 2000);
  });

  return card;
}

/* Mensaje dentro de la grilla (vacío o error de carga) */
function _gridMessage(grid, texto) {
  const p = document.createElement('p');
  p.className = 'grid-message';
  p.textContent = texto;
  grid.appendChild(p);
}

function _fetchProducts() {
  return fetch(DATA_URL).then(function (response) {
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return response.json();
  });
}

/* Renderiza todos los productos de una categoría */
function renderProducts(category) {
  const grid = document.querySelector('.products-grid');
  if (!grid) return;

  _fetchProducts()
    .then(function (data) {
      const list = data[category] || [];
      if (list.length === 0) {
        _gridMessage(grid, 'Todavía no hay productos cargados en esta categoría.');
        return;
      }
      list.forEach(function (product) {
        grid.appendChild(createProductCard(product));
      });
    })
    .catch(function () {
      _gridMessage(grid, 'No se pudieron cargar los productos. Abrí el sitio con un servidor local (Live Server) o desde GitHub Pages.');
    });
}

/* Renderiza los primeros 3 productos de cada categoría en el home */
function renderFeatured() {
  const grid = document.querySelector('.featured-grid');
  if (!grid) return;

  _fetchProducts()
    .then(function (data) {
      ['autos', 'motos', 'cuatriciclos'].forEach(function (category) {
        (data[category] || []).slice(0, 3).forEach(function (product) {
          grid.appendChild(createProductCard(product));
        });
      });
    })
    .catch(function () {
      _gridMessage(grid, 'No se pudieron cargar los productos. Abrí el sitio con un servidor local (Live Server) o desde GitHub Pages.');
    });
}
