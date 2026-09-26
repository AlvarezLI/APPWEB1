# RODEX — Concesionaria Online

**Autor:** Alvarez Luis Ignacio Jesús

## Descripción

RODEX es una tienda online (e-commerce) de vehículos: autos, motos y cuatriciclos.
El proyecto corresponde al Trabajo Práctico de la materia.



## Páginas




| `index.html` (raíz) -- Punto de entrada del sitio; redirige a `pages/index.html` |

| `pages/index.html` -- Home con navbar, hero, grilla de las 3 categorías y productos destacados |

| `pages/gate.html` -- Landing de bienvenida para quien todavía no inició sesión |

| `pages/login.html` -- Formulario de inicio de sesión (email + contraseña) |

| `pages/register.html` -- Formulario de registro (nombre, apellido, email, contraseña y fecha de nacimiento) |

| `pages/autos.html` -- Categoría Autos |

| `pages/motos.html` -- Categoría Motos |

| `pages/cuatriciclos.html` -- Categoría Cuatriciclos |

| `pages/cart.html` -- Carrito con cantidades, subtotales, total y compra |
>>>>>>> ae880285e78b769bd4d672e41afcf4c8902636cc

## Funcionalidades

### Navegación
- **Navbar dinámica**: se genera con JavaScript desde un único array (`navLinks` en `components/navbar.js`),
  así todas las páginas comparten el mismo menú y marca sola la sección activa.
- Ícono/logo de la tienda en SVG inline, ícono de carrito con contador y botón de **iniciar / cerrar sesión**.
- Menú hamburguesa en pantallas chicas.
- Home y categorías se pueden recorrer sin iniciar sesión.

### Autenticación
- **Registro** con validación de campos completos, email y contraseña de mínimo 8 caracteres.
- **Login** simulado: se validan los campos y se guarda el usuario en `sessionStorage`
  (las claves se validarán contra un backend en AW2).
- **Cerrar sesión** borra la sesión y redirige al login.
- **Ruta protegida**: para agregar productos o entrar al carrito hay que estar logueado;
  si no, redirige a `login.html`.

### Catálogo y carrito
- Los productos se cargan con `fetch()` desde `data/productos.json` y se renderizan con el componente
  `cardComponent()`; no hay HTML de productos duplicado entre páginas.
- Selector de cantidad por producto y botón "Agregar al carrito".
- Carrito persistido en `localStorage`, con contador en la navbar,
  eliminación de ítems, vaciado del carrito y confirmación de compra.

## Tecnologías

- HTML5 semántico
- CSS3 con custom properties, Flexbox, Grid, mobile first y nomenclatura BEM (sin frameworks externos)
- JavaScript vanilla (ES6, módulos `import` / `export`)
- Fetch API · localStorage · sessionStorage
- Google Fonts: Space Grotesk + DM Sans


## Cómo ejecutar el proyecto

El catálogo se carga con `fetch()` y el JavaScript usa módulos, y los navegadores bloquean ambas cosas al abrir el HTML con
doble clic (protocolo `file://`). Para verlo funcionando, usá:

- **Live Server** (extensión de VS Code): clic derecho en `index.html` → *Open with Live Server*.
- **Python:** `python -m http.server 5500` en la carpeta del proyecto y entrar a
  `http://localhost:5500`.

Primer uso: entrar a Crear cuenta, registrarse y después iniciar sesión.
No hay servidor ni base de datos: el login es simulado.
