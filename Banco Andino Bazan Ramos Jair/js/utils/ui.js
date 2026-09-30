// Utilidades de interfaz compartidas por todas las páginas
import { cerrarSesion } from '../auth/auth.js';

export function esc(texto) {
  const d = document.createElement('div');
  d.textContent = texto ?? '';
  return d.innerHTML;
}

// Mensaje de éxito/error. Usa la clase .msg (transición tipo Semana 5: reemplaza por tu animación si quieres)
export function mostrarMensaje(id, texto, tipo = 'ok') {
  const el = document.getElementById(id);
  el.textContent = texto;
  el.className = 'msg ' + tipo;
  el.hidden = false;
  el.classList.remove('anim');
  void el.offsetWidth;
  el.classList.add('anim');
}

export function pintarNav(usuario) {
  const nav = document.getElementById('nav');
  const enlaces = usuario.rol === 'cliente'
    ? '<a href="registro.html">Abrir cuenta</a><a href="consulta.html">Mis solicitudes</a>'
    : '<a href="panel.html">Panel de gestión</a>';
  nav.innerHTML = enlaces + '<span class="quien">' + esc(usuario.nombre) + ' (' + esc(usuario.rol) + ')</span>' +
    '<button type="button" id="btnSalir">Cerrar sesión</button>';
  document.getElementById('btnSalir').addEventListener('click', cerrarSesion);
}

export const fmtMonto = (m, mon) => (mon === 'USD' ? 'US$ ' : 'S/ ') + Number(m).toFixed(2);
export const fmtFecha = f => new Date(f).toLocaleDateString('es-PE');
