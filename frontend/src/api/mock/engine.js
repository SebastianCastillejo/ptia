// Versión reducida del motor de recomendación (sección 6.e del documento).
// Sirve para que la interfaz funcione sin backend y para comparar resultados
// cuando el motor real en Python esté listo: ambos deben dar lo mismo.
import { RECETAS, SUSTITUTOS, SINONIMOS, BASICOS } from './data.js';

const PESO_PRINCIPAL = 1;
const PESO_BASICO = 0.3;
const COBERTURA_MINIMA = 0.5;

const quitarTildes = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();

function levenshtein(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

const VOCABULARIO = (() => {
  const v = {};
  RECETAS.forEach((r) => [...r.principales, ...r.basicos].forEach((i) => (v[quitarTildes(i)] = i)));
  SUSTITUTOS.forEach(([a, b]) => { v[quitarTildes(a)] = a; v[quitarTildes(b)] = b; });
  return v;
})();
const SIN = Object.fromEntries(Object.entries(SINONIMOS).map(([k, v]) => [quitarTildes(k), v]));

/** 1. Normalizador: exacto -> sinónimo -> plural -> corrección -> desconocido */
export function normalizarTermino(entrada) {
  const t = quitarTildes(entrada);
  if (!t) return null;
  if (VOCABULARIO[t]) return { entrada: entrada.trim(), nombre: VOCABULARIO[t], metodo: 'exacto' };
  if (SIN[t]) return { entrada: entrada.trim(), nombre: SIN[t], metodo: 'sinonimo' };
  const singular = t.replace(/es$/, '').replace(/s$/, '');
  if (VOCABULARIO[singular]) return { entrada: entrada.trim(), nombre: VOCABULARIO[singular], metodo: 'plural' };
  if (SIN[singular]) return { entrada: entrada.trim(), nombre: SIN[singular], metodo: 'sinonimo' };
  let mejor = null, dist = Infinity;
  for (const k of Object.keys(VOCABULARIO)) {
    const d = levenshtein(t, k);
    if (d < dist) { dist = d; mejor = k; }
  }
  if (mejor && t.length >= 4 && dist <= Math.max(1, Math.floor(mejor.length * 0.2)))
    return { entrada: entrada.trim(), nombre: VOCABULARIO[mejor], metodo: 'correccion' };
  return { entrada: entrada.trim(), nombre: entrada.trim(), metodo: 'desconocido' };
}

/** 2-4. Recuperación, puntuación con sustituciones, ranking y explicación */
export function recomendar(ingredientes, incluirBasicos, limite) {
  const tiene = new Set(ingredientes);
  if (incluirBasicos) BASICOS.forEach((b) => tiene.add(b));
  const delUsuario = ingredientes.filter((i) => !BASICOS.includes(i));

  const candidatas = [];
  for (const r of RECETAS) {
    let sumaPesos = 0, sumaPuntos = 0, compartidos = 0;
    const usados = new Set(), faltantes = [], sustituciones = [], detalle = [];

    for (const ing of r.principales) {
      sumaPesos += PESO_PRINCIPAL;
      if (tiene.has(ing)) {
        sumaPuntos += PESO_PRINCIPAL; usados.add(ing); compartidos++;
        detalle.push({ nombre: ing, tipo: 'principal', estado: 'tiene' });
        continue;
      }
      const sus = SUSTITUTOS.find(([necesita, usar]) => necesita === ing && tiene.has(usar));
      if (sus) {
        sumaPuntos += PESO_PRINCIPAL * sus[2]; usados.add(sus[1]); compartidos++;
        sustituciones.push({ necesita: ing, usar: sus[1], confianza: sus[2] });
        detalle.push({ nombre: ing, tipo: 'principal', estado: 'sustituto', sustituto: sus[1] });
      } else {
        faltantes.push(ing);
        detalle.push({ nombre: ing, tipo: 'principal', estado: 'falta' });
      }
    }
    for (const ing of r.basicos) {
      sumaPesos += PESO_BASICO;
      const ok = tiene.has(ing);
      if (ok) sumaPuntos += PESO_BASICO; else faltantes.push(ing);
      detalle.push({ nombre: ing, tipo: 'basico', estado: ok ? 'despensa' : 'falta' });
    }

    if (compartidos < (delUsuario.length < 2 ? 1 : 2)) continue;
    const cobertura = sumaPuntos / sumaPesos;
    if (cobertura < COBERTURA_MINIMA) continue;
    const usadosUsuario = delUsuario.filter((u) => usados.has(u)).length;
    const aprovechamiento = delUsuario.length ? usadosUsuario / delUsuario.length : 0;
    const penalizacion = 0.1 * r.principales.filter((i) => faltantes.includes(i)).length;
    const utilidad = 0.6 * cobertura + 0.4 * aprovechamiento - penalizacion;

    let explicacion = `Aprovecha ${usadosUsuario} de tus ${delUsuario.length} ingredientes y cubre el ${Math.round(cobertura * 100)}% de la receta.`;
    if (sustituciones.length) explicacion += ` Puedes reemplazar ${sustituciones.map((s) => `${s.necesita} por ${s.usar}`).join(' y ')}.`;
    explicacion += faltantes.length ? ` Solo te faltaría: ${faltantes.join(', ')}.` : ' No te falta nada.';

    candidatas.push({
      id: r.id, nombre: r.nombre, tiempoMin: r.tiempoMin, imagenUrl: null,
      cobertura: +cobertura.toFixed(3), aprovechamiento: +aprovechamiento.toFixed(3), utilidad: +utilidad.toFixed(3),
      usados: usadosUsuario, totalUsuario: delUsuario.length,
      faltantes, sustituciones, ingredientes: detalle, explicacion,
    });
  }

  candidatas.sort((a, b) => b.utilidad - a.utilidad || a.faltantes.length - b.faltantes.length || a.tiempoMin - b.tiempoMin);
  return candidatas.slice(0, limite);
}
