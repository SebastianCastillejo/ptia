// Única puerta de entrada a los datos para toda la interfaz.
// Las páginas y hooks SOLO importan de aquí: pasar del mock al backend real
// es poner VITE_USE_MOCK=false en .env, sin tocar componentes.
//
// El contrato de cada función está en docs/contrato-api.md
import { USE_MOCK } from './config.js';
import { request } from './client.js';
import * as mock from './mock/mockServer.js';

/** Convierte texto libre ("jitomate, Huevos") en ingredientes canónicos. */
export function normalizarIngredientes(texto) {
  if (USE_MOCK) return mock.normalizar({ texto });
  return request('/ingredientes/normalizar', { method: 'POST', body: { texto } });
}

/** Devuelve las mejores recetas para la lista de ingredientes. */
export function recomendarRecetas({ ingredientes, incluirBasicos = true, limite = 5 }) {
  const body = { ingredientes, incluirBasicos, limite };
  if (USE_MOCK) return mock.recomendar(body);
  return request('/recomendaciones', { method: 'POST', body });
}

/** Detalle completo de una receta (pasos, porciones, imagen). */
export function obtenerReceta(id) {
  if (USE_MOCK) return mock.receta(id);
  return request(`/recetas/${encodeURIComponent(id)}`);
}

/** Ingredientes para los botones de "Sugerencias rápidas". */
export function obtenerSugerencias() {
  if (USE_MOCK) return mock.sugerencias();
  return request('/ingredientes/sugerencias');
}
