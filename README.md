# RODEX — Concesionaria Online

**Autor:** Alvarez Luis Ignacio Jesús

## Descripción

RODEX es una tienda online (e-commerce) de vehículos: autos, motos y cuatriciclos.
El proyecto corresponde al Trabajo Práctico de la materia.



## Páginas

| Página -- Descripción |
| `index.html` (raíz) -- Punto de entrada del sitio; redirige a `pages/index.html` |
| `pages/index.html` -- Home con navbar, hero, grilla de las 3 categorías y productos destacados |
| `pages/gate.html` -- Landing de bienvenida para quien todavía no inició sesión |
| `pages/login.html` -- Formulario de inicio de sesión (email + contraseña) |
| `pages/register.html` -- Formulario de registro (nombre, apellido, email, contraseña y fecha de nacimiento) |
| `pages/autos.html` -- Categoría Autos |
| `pages/motos.html` -- Categoría Motos |
| `pages/cuatriciclos.html` -- Categoría Cuatriciclos |
| `pages/cart.html` -- Carrito con cantidades, subtotales, total y compra |

## Funcionalidades

### Navegación
- **Navbar dinámica**: se genera con JavaScript desde un único array (`NAV_PAGES` en `js/navbar.js`),
  así todas las páginas comparten el mismo menú y marca sola la sección activa.
- Ícono/logo de la tienda en SVG inline, ícono de carrito con contador y botón de **cerrar sesión**.
- Menú hamburguesa en pantallas chicas.

### Autenticación y seguridad
- **Registro** con validación de nombre y apellido (solo letras), formato de email, contraseña de
  mínimo 8 caracteres combinando letras y números, y fecha de nacimiento válida con control de mayoría de edad (18 años).
- Las contraseñas no se guardan en texto plano: se almacena un hash (`_hash()` en `js/auth.js`).
- **Login** con mensaje de error genérico ("Correo o contraseña incorrectos") para no revelar si un
  correo está registrado.
- **Sesión** en `sessionStorage` con expiración por inactividad de 60 minutos.
- **Rutas protegidas**: `guardAuth()` redirige a `gate.html` a quien no tenga sesión activa
  (home, categorías y carrito). `guardGuest()` hace lo inverso en login y registro.
- Todo texto dinámico se escapa con `escapeHtml()` antes de inyectarse en el DOM (prevención de XSS).

### Catálogo y carrito
- Los productos se cargan con `fetch()` desde `data/products.json` y se renderizan con el componente
  `createProductCard()`; no hay HTML de productos duplicado entre páginas.
- Selector de cantidad por producto y botón "Agregar al carrito".
- Carrito persistido en `localStorage` por usuario, con badge en tiempo real en la navbar,
  edición de cantidades, eliminación de ítems, vaciado del carrito y confirmación de compra.

## Tecnologías

- HTML5 semántico
- CSS3 con custom properties (sin frameworks externos)
- JavaScript vanilla (ES6)
- Fetch API · localStorage · sessionStorage
- Google Fonts: Space Grotesk + DM Sans


## Cómo ejecutar el proyecto

El catálogo se carga con `fetch()`, y los navegadores bloquean esa llamada al abrir el HTML con
doble clic (protocolo `file://`). Para verlo funcionando, usá:

- **Python:** `python -m http.server 5500` en la carpeta del proyecto y entrar a
  `http://localhost:5500`.

Primer uso: entrar a Crear cuenta, registrarse y después iniciar sesión.
Los usuarios quedan guardados en el navegador (`localStorage`), no hay servidor ni base de datos.

