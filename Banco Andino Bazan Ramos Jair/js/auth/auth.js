import { sql } from '../config/neon-config.js';

export async function registrarUsuario(nombre, correo, contrasena) {
  const existe = await sql`SELECT id FROM usuarios WHERE correo = ${correo};`;
  if (existe.length > 0) return null;
  const filas = await sql`
    INSERT INTO usuarios (nombre, correo, contrasena, rol)
    VALUES (${nombre}, ${correo}, ${contrasena}, 'cliente')
    RETURNING id, nombre, rol;`;
  return filas[0];
}

export async function iniciarSesion(correo, contrasena) {
  const filas = await sql`
    SELECT id, nombre, rol FROM usuarios
    WHERE correo = ${correo} AND contrasena = ${contrasena};`;
  if (filas.length === 0) return null;
  sessionStorage.setItem('usuario', JSON.stringify(filas[0]));
  return filas[0];
}

export function cerrarSesion() {
  sessionStorage.removeItem('usuario');
  window.location.href = 'login.html';
}

export function exigirSesion() {
  const dato = sessionStorage.getItem('usuario');
  if (!dato) {
    window.location.href = 'login.html';
    throw new Error('Sin sesión');
  }
  return JSON.parse(dato);
}

export function irSegunRol(usuario) {
  window.location.href = usuario.rol === 'cliente' ? 'registro.html' : 'panel.html';
}
