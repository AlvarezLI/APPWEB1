/* ==========================================================
   Componente Footer
   ========================================================== */

export const footerComponent = `
  <span class="footer__brand">Rodex</span>
  <span>&copy; 2026 RODEX. Todos los derechos reservados.</span>`;

export const iniciarFooter = () => {
  const footer = document.querySelector('.footer');
  if (footer) {
    footer.innerHTML = footerComponent;
  }
};
