/* ==========================================================
   RODEX — Autenticación, validaciones y rutas protegidas
   ==========================================================
   Persistencia:
     - localStorage   -> usuarios registrados (rodex_users)
     - sessionStorage -> sesión activa        (rodex_session)
   ========================================================== */

const _S = 'rodex_session';
const _U = 'rodex_users';

/* Duración máxima de la sesión: 60 minutos de inactividad */
const _SESSION_MS = 60 * 60 * 1000;

/* ----------------------------------------------------------
   SESIÓN
   ---------------------------------------------------------- */

/* Retorna el objeto de sesión o null (null también si expiró) */
function getSession() {
  try {
    const raw = sessionStorage.getItem(_S);
    if (!raw) return null;

    const session = JSON.parse(raw);
    if (!session || !session.email) return null;

    /* Chequeo de expiración por inactividad */
    if (Date.now() - session.ultimoAcceso > _SESSION_MS) {
      sessionStorage.removeItem(_S);
      return null;
    }

    /* Renueva la marca de actividad */
    session.ultimoAcceso = Date.now();
    sessionStorage.setItem(_S, JSON.stringify(session));
    return session;
  } catch {
    return null;
  }
}

/* Retorna true si hay sesión activa */
function isLoggedIn() {
  return getSession() !== null;
}

/* ----------------------------------------------------------
   LOGIN / REGISTRO / LOGOUT
   ---------------------------------------------------------- */

/* Intenta loguear. Retorna { ok, error? } */
function authLogin(email, password) {
  if (!validarEmail(email)) {
    return { ok: false, error: 'Ingresá un correo electrónico válido.' };
  }
  if (!password) {
    return { ok: false, error: 'Ingresá tu contraseña.' };
  }

  const user = _getUsers().find(function (u) {
    return u.email === email.trim().toLowerCase() && u.password === _hash(password);
  });

  if (!user) {
    /* Mensaje genérico a propósito: no revela si el correo existe */
    return { ok: false, error: 'Correo o contraseña incorrectos.' };
  }

  sessionStorage.setItem(_S, JSON.stringify({
    email:        user.email,
    nombre:       user.nombre,
    apellido:     user.apellido,
    inicio:       Date.now(),
    ultimoAcceso: Date.now()
  }));

  return { ok: true };
}

/* Registra un nuevo usuario. Retorna { ok, error? } */
function authRegister(data) {
  const nombre   = (data.nombre   || '').trim();
  const apellido = (data.apellido || '').trim();
  const email    = (data.email    || '').trim().toLowerCase();
  const password = data.password  || '';
  const fecha    = data.fechaNacimiento || '';

  /* --- Validaciones del servidor simulado --- */
  if (!nombre || !apellido) {
    return { ok: false, error: 'Completá tu nombre y apellido.' };
  }
  if (!validarNombre(nombre) || !validarNombre(apellido)) {
    return { ok: false, error: 'Nombre y apellido solo pueden contener letras.' };
  }
  if (!validarEmail(email)) {
    return { ok: false, error: 'Ingresá un correo electrónico válido.' };
  }

  const pass = validarPassword(password);
  if (!pass.ok) return { ok: false, error: pass.error };

  const edad = validarFechaNacimiento(fecha);
  if (!edad.ok) return { ok: false, error: edad.error };

  const users = _getUsers();
  if (users.some(function (u) { return u.email === email; })) {
    return { ok: false, error: 'Ya existe una cuenta registrada con ese correo.' };
  }

  users.push({
    nombre:          nombre,
    apellido:        apellido,
    email:           email,
    password:        _hash(password),   /* nunca se guarda en texto plano */
    fechaNacimiento: fecha,
    creado:          new Date().toISOString()
  });

  try {
    localStorage.setItem(_U, JSON.stringify(users));
  } catch {
    return { ok: false, error: 'No se pudo guardar la cuenta en este navegador.' };
  }

  return { ok: true };
}

/* Cierra sesión y redirige al login */
function authLogout() {
  sessionStorage.removeItem(_S);
  window.location.href = _root() + 'login.html';
}

/* Llamar en páginas protegidas: redirige si no hay sesión activa */
function guardAuth() {
  if (!isLoggedIn()) {
    window.location.replace(_root() + 'gate.html');
  }
}

/* Llamar en login/registro: si ya hay sesión, va directo al home */
function guardGuest() {
  if (isLoggedIn()) {
    window.location.replace(_root() + 'index.html');
  }
}

/* ----------------------------------------------------------
   VALIDACIONES REUTILIZABLES
   ---------------------------------------------------------- */

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test((email || '').trim());
}

function validarNombre(valor) {
  return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]{2,40}$/.test((valor || '').trim());
}

/* Mínimo 8 caracteres, con al menos una letra y un número */
function validarPassword(password) {
  if ((password || '').length < 8) {
    return { ok: false, error: 'La contraseña debe tener al menos 8 caracteres.' };
  }
  if (!/[A-Za-zÁÉÍÓÚÑáéíóúñ]/.test(password) || !/[0-9]/.test(password)) {
    return { ok: false, error: 'La contraseña debe combinar letras y números.' };
  }
  return { ok: true };
}

/* Fecha válida, no futura y mayor de 18 años (venta de vehículos) */
function validarFechaNacimiento(fecha) {
  if (!fecha) {
    return { ok: false, error: 'Ingresá tu fecha de nacimiento.' };
  }

  const nacimiento = new Date(fecha + 'T00:00:00');
  if (isNaN(nacimiento.getTime())) {
    return { ok: false, error: 'La fecha de nacimiento no es válida.' };
  }

  const hoy = new Date();
  if (nacimiento > hoy) {
    return { ok: false, error: 'La fecha de nacimiento no puede ser futura.' };
  }

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;

  if (edad < 18) {
    return { ok: false, error: 'Tenés que ser mayor de 18 años para registrarte.' };
  }
  if (edad > 110) {
    return { ok: false, error: 'Revisá la fecha de nacimiento ingresada.' };
  }

  return { ok: true, edad: edad };
}

/* ----------------------------------------------------------
   HELPERS INTERNOS
   ---------------------------------------------------------- */

/* Ruta raíz relativa: todas las páginas viven en /pages */
function _root() {
  return '';
}

function _getUsers() {
  try { return JSON.parse(localStorage.getItem(_U)) || []; } catch { return []; }
}

/* Hash didáctico (djb2 + sal). No es criptografía real, pero evita
   guardar la contraseña en texto plano dentro del navegador. */
function _hash(password) {
  const texto = 'rodex$' + password;
  let h = 5381;
  for (let i = 0; i < texto.length; i++) {
    h = ((h << 5) + h + texto.charCodeAt(i)) >>> 0;
  }
  return 'h' + h.toString(16);
}

/* Escapa texto antes de inyectarlo con innerHTML (previene XSS) */
function escapeHtml(valor) {
  return String(valor == null ? '' : valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* Formato de precio en pesos argentinos */
function formatPrice(valor) {
  return '$' + Number(valor || 0).toLocaleString('es-AR');
}

/* ----------------------------------------------------------
   MENÚ MOBILE
   ---------------------------------------------------------- */

function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
