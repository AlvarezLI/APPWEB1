# RODEX — Concesionaria Online

**Autor:** Alvarez Luis Ignacio Jesús

## Descripción

RODEX es una tienda online (e-commerce) de vehículos: autos, motos y cuatriciclos.
Trabajo práctico de la materia Aplicaciones Web 1.

## Estructura del proyecto

```
APPWEB1/
├── index.html              ← Home (página de inicio)
├── index.js                ← Controlador del home
├── css/
│   └── styles.css          ← Estilos (mobile first + BEM)
├── assets/
│   └── img/                ← Imágenes de los productos por categoría
├── data/
│   └── productos.json      ← Productos por categoría (id, titulo, descripcion, imagen, precio)
├── components/             ← Partes de la vista que se reutilizan
│   ├── navbar.js           ← Navbar armada desde el array navLinks
│   ├── card.js             ← Card de producto
│   └── footer.js
├── utils/                  ← Lógica y acceso a datos
│   ├── api.js              ← fetch del JSON de productos
│   ├── storage.js          ← sessionStorage (usuario) y localStorage (carrito)
│   ├── sesion.js           ← Login / logout simulado
│   ├── carrito.js          ← Agregar, eliminar, vaciar y calcular total
│   └── formato.js          ← Formato de precios
└── pages/                  ← Cada página con su HTML y su controlador JS
    ├── categorias/         ← autos.html, motos.html, cuatriciclos.html + categoria.js
    ├── login/              ← login.html + login.js
    ├── register/           ← register.html + register.js
    └── cart/               ← cart.html + cart.js
```

Cada HTML carga un único archivo JS externo (`<script type="module">`); no hay JavaScript
embebido ni estilos en línea.

## Funcionalidades

- **Navegación libre:** el home y las categorías se pueden recorrer sin iniciar sesión.
- **Navbar como componente:** se genera con JavaScript desde el array `navLinks`
  (títulos y rutas) y se inserta en todas las páginas. Incluye el logo de la tienda, los links,
  el ícono del carrito con contador y el botón de iniciar o cerrar sesión.
- **Login simulado:** se valida que los campos estén completos y se guarda el usuario en
  `sessionStorage`. Después redirige al home. La validación real de las claves queda para AW2.
- **Registro simulado:** valida nombre, apellido, email, contraseña (mínimo 8 caracteres)
  y fecha de nacimiento, y redirige al login.
- **Cerrar sesión:** borra la sesión y redirige al login.
- **Productos con fetch:** se leen desde `data/productos.json` y se muestran con el componente card
  (imagen, título, descripción, precio, cantidad + / − y botón "Agregar al carrito").
  En el home se muestran 3 productos por categoría.
- **Carrito (requiere sesión):** agregar productos o entrar al carrito sin estar logueado
  redirige al login. Los productos se guardan en `localStorage`. El carrito muestra cantidad,
  subtotal y total, y permite eliminar productos, vaciarlo y finalizar la compra.

## Tecnologías

- HTML5 semántico
- CSS3: variables, Flexbox, Grid, media queries (mobile first) y nomenclatura BEM
- JavaScript (ES6): módulos, funciones flecha, template strings, métodos de arrays,
  eventos del DOM, fetch, sessionStorage y localStorage
- Google Fonts: Space Grotesk + DM Sans

## Cómo ejecutar el proyecto

El proyecto usa `fetch()` y módulos de JavaScript, por eso hay que abrirlo con un servidor local
(no funciona con doble clic en el HTML):

- **VS Code:** extensión *Live Server* → clic derecho en `index.html` → *Open with Live Server*.
- **Python:** `python -m http.server 5500` en la carpeta del proyecto y entrar a `http://localhost:5500`.
