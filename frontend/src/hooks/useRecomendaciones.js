import { useCallback, useEffect, useState } from 'react';
import { recomendarRecetas } from '../api/recetasApi.js';
import { useBusqueda } from '../context/BusquedaContext.jsx';

export function useRecomendaciones() {
  const { reconocidos, incluirBasicos, recetas, setRecetas } = useBusqueda();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const clave = reconocidos.join('|') + (incluirBasicos ? '+b' : '');

  const cargar = useCallback(async () => {
    if (!reconocidos.length) { setCargando(false); return; }
    setCargando(true);
    setError(null);
    try {
      const res = await recomendarRecetas({ ingredientes: reconocidos, incluirBasicos, limite: 5 });
      setRecetas(res.recetas);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clave]);

  useEffect(() => { cargar(); }, [cargar]);

  return { recetas, cargando, error, reintentar: cargar };
}
