// Simula las respuestas del backend con la MISMA forma que define
// docs/contrato-api.md, incluyendo un pequeño retraso de red.
import { RECETAS, SUGERENCIAS } from './data.js';
import { normalizarTermino, recomendar as motor } from './engine.js';
import { ApiError } from '../client.js';

const esperar = (ms = 350) => new Promise((r) => setTimeout(r, ms));

export async function normalizar({ texto }) {
  await esperar(120);
  const ingredientes = String(texto || '')
    .split(',')
    .map((t) => normalizarTermino(t))
    .filter(Boolean);
  return { ingredientes };
}

export async function recomendar({ ingredientes, incluirBasicos, limite }) {
  await esperar();
  return { recetas: motor(ingredientes, incluirBasicos, limite) };
}

export async function receta(id) {
  await esperar(150);
  const r = RECETAS.find((x) => x.id === id);
  if (!r) throw new ApiError('No encontramos esa receta.', 404);
  return { id: r.id, nombre: r.nombre, tiempoMin: r.tiempoMin, porciones: 4, imagenUrl: null, pasos: r.pasos };
}

export async function sugerencias() {
  await esperar(80);
  return { ingredientes: SUGERENCIAS };
}
