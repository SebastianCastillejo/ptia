import { useEffect, useState } from 'react';
import { obtenerSugerencias } from '../api/recetasApi.js';

export function useSugerencias() {
  const [sugerencias, setSugerencias] = useState([]);
  useEffect(() => {
    obtenerSugerencias().then((r) => setSugerencias(r.ingredientes)).catch(() => setSugerencias([]));
  }, []);
  return sugerencias;
}
