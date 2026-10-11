import { API_BASE_URL } from './config.js';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Envoltura mínima de fetch: JSON de ida y vuelta, errores claros y tiempo límite.
export async function request(path, { method = 'GET', body, timeoutMs = 8000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_BASE_URL}/api${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      throw new ApiError(data?.detail || `El servidor respondió ${res.status}`, res.status);
    }
    return data;
  } catch (err) {
    if (err.name === 'AbortError') throw new ApiError('El servidor tardó demasiado en responder.', 408);
    if (err instanceof ApiError) throw err;
    throw new ApiError('No se pudo conectar con el servidor. Revisa que el backend esté corriendo.', 0);
  } finally {
    clearTimeout(timer);
  }
}
