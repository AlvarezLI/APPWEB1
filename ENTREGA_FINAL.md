# RODEX — Entrega Final · Trabajo Integrador · Aplicaciones Web 1

**Autor:** Alvarez Luis Ignacio Jesús

## 1. Enlaces

| Recurso | Enlace |
|---|---|
| Sitio publicado (GitHub Pages) | https://alvarezli.github.io/APPWEB1/ |
| Repositorio | https://github.com/AlvarezLI/APPWEB1 |
| Video explicativo | **PENDIENTE: pegar acá el link (YouTube / Drive / Loom)** |

## 2. Roadmap de desarrollo

El proyecto se construyó por etapas, y cada una se apoyó en la anterior.

| Etapa | Qué se hizo | Resultado |
|---|---|---|
| 1 — Estructura (ago 2026) | Elegí el rubro (concesionaria de autos, motos y cuatriciclos), armé las carpetas y las páginas HTML semánticas: home, 3 categorías, login, registro y carrito. | Esqueleto navegable. |
| 2 — Estilos | CSS mobile first con nomenclatura BEM, variables CSS, Flexbox para navbar y cards, Grid para categorías y grillas de productos. | Sitio responsive y consistente. |
| 3 — Componentes y JS | Navbar, card y footer como funciones de JavaScript que devuelven HTML. Login y registro con validación de campos. | Sin HTML duplicado entre páginas. |
| 4 — Datos y carrito | Catálogo en `data/productos.json` leído con `fetch`. Sesión del usuario en `sessionStorage`. Carrito en `localStorage`, con contador en la navbar y eliminación de ítems. | Flujo completo: elegir producto → carrito → compra. |
| Correcciones (oct 2026) | Apliqué las observaciones de la primera entrega: módulos ES6, rutas protegidas, separación en `utils/`, descripciones del README. | Código más ordenado. |
| Entrega final (nov 2026) | Edición de cantidades en el carrito, mejoras de accesibilidad, publicación en GitHub Pages y esta documentación. | Producto terminado. |

**Iteraciones y cambios de rumbo**
- Primero repetía el HTML de las cards en cada página. Lo pasé a un componente único (`cardComponent`), con lo que agregar un producto es solo editar el JSON.
- La lógica del carrito estaba mezclada con el acceso al storage. La separé en `utils/storage.js` (leer/guardar) y `utils/carrito.js` (reglas del carrito).
- Opté por un archivo JSON en lugar de una API externa: no depende de terceros y funciona igual en cualquier hosting estático.

## 3. Tecnologías utilizadas

**No incorporé tecnologías nuevas respecto de las entregas previas.** 

| Tecnología | Por qué la elegí | Cómo se integra |
|---|---|---|
| HTML5 semántico | Estructura clara y accesible (`header`, `main`, `section`, `footer`, `nav`). | Una página por pantalla; navbar y footer se inyectan por JS. |
| CSS3 (custom properties, Flexbox, Grid, BEM, mobile first) | Diseño responsive sin frameworks, con estilos fáciles de mantener. | Un único `css/styles.css` con variables de color y tipografía. |
| JavaScript ES6 con módulos | Código separado por responsabilidad (`components/`, `utils/`, controladores por página). | `<script type="module">` en cada HTML. |
| Fetch API | Pedir los datos de los productos como en una aplicación real. | `utils/api.js` lee `data/productos.json`. |
| sessionStorage / localStorage | Sesión que dura mientras está abierta la pestaña, y carrito que persiste. | `utils/storage.js` centraliza la lectura y escritura. |
| Google Fonts (Space Grotesk, DM Sans) | Identidad visual propia. | `<link>` en el `<head>`. |
| Git + GitHub Pages | Control de versiones y publicación gratuita de sitios estáticos. | Rutas relativas en todo el proyecto, así funciona en la subcarpeta `/APPWEB1/`. |

## 4. Mejora significativa

Respecto de las entregas parciales, sumé estas mejoras:

1. **Nueva funcionalidad: edición de cantidades en el carrito.** Antes solo se podía eliminar un ítem entero. Ahora cada fila tiene botones **−** y **+**; el subtotal, el total y el contador de la navbar se actualizan al instante, y si la cantidad llega a 0 el producto se quita. La lógica está en `cambiarCantidad()` de `utils/carrito.js`.
2. **Accesibilidad.**
   - Enlace "Saltar al contenido" para navegar con teclado.
   - Indicador de foco visible (`:focus-visible`) en enlaces, botones e inputs.
   - Etiquetas `aria-label` descriptivas en los botones de cantidad (incluyen el nombre del producto).
   - `aria-live` en el selector de cantidad de las cards.
   - Respeto de `prefers-reduced-motion` para quienes reducen animaciones.
3. **SEO básico:** `meta description` en todas las páginas.
4. **Organización del código:** componentes reutilizables, `utils/` con responsabilidad única y el catálogo separado del código en un JSON.

## 5. Funcionalidades (resumen)

- Home con 3 productos por categoría, tomados del JSON.
- Categorías Autos, Motos y Cuatriciclos con cards (imagen, título, descripción, precio, selector de cantidad y botón "Agregar al carrito").
- Registro y login simulados; el usuario logueado se guarda en `sessionStorage`.
- Carrito en `localStorage`, accesible solo con sesión iniciada: cambiar cantidades, eliminar ítems, vaciar y finalizar compra.

## 6. Github/ Github PAGES:

- Opté por utilizar github pages ya que era la forma mas inmediata y práctica para el deploy de la página. El link es:
https://alvarezli.github.io/APPWEB1/

- Adjunto link al repositorio: https://github.com/AlvarezLI/APPWEB1


