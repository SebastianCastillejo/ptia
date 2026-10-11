// Configuración central de la capa de datos.
export const USE_MOCK = String(import.meta.env.VITE_USE_MOCK ?? 'true') === 'true';
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
