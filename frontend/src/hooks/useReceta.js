import { useEffect, useState } from 'react';
import { obtenerReceta } from '../api/recetasApi.js';

export function useReceta(id) {
  const [receta, setReceta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let vigente = true;
    setCargando(true);
    setError(null);
    obtenerReceta(id)
      .then((r) => vigente && setReceta(r))
      .catch((e) => vigente && setError(e.message))
      .finally(() => vigente && setCargando(false));
    return () => { vigente = false; };
  }, [id]);

  return { receta, cargando, error };
}
