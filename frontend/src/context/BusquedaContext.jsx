import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { normalizarIngredientes } from '../api/recetasApi.js';

// Estado compartido entre pantallas: lo que el usuario tiene en la cocina
// y las últimas recetas recomendadas (para que el detalle sepa qué tiene/falta).
const BusquedaContext = createContext(null);
const CLAVE = 'aprovecha:busqueda';

function cargarGuardado() {
  try {
    const raw = sessionStorage.getItem(CLAVE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function BusquedaProvider({ children }) {
  const guardado = cargarGuardado();
  const [ingredientes, setIngredientes] = useState(guardado?.ingredientes ?? []);
  const [incluirBasicos, setIncluirBasicos] = useState(guardado?.incluirBasicos ?? true);
  const [recetas, setRecetas] = useState(guardado?.recetas ?? []);

  useEffect(() => {
    try {
      sessionStorage.setItem(CLAVE, JSON.stringify({ ingredientes, incluirBasicos, recetas }));
    } catch {
      /* el almacenamiento puede no estar disponible; la app sigue funcionando */
    }
  }, [ingredientes, incluirBasicos, recetas]);

  const agregar = useCallback(async (texto) => {
    if (!texto.trim()) return;
    const { ingredientes: nuevos } = await normalizarIngredientes(texto);
    setIngredientes((prev) => {
      const lista = [...prev];
      nuevos.forEach((n) => {
        if (!lista.some((x) => x.nombre === n.nombre)) lista.push(n);
      });
      return lista;
    });
  }, []);

  const quitar = useCallback((nombre) => setIngredientes((prev) => prev.filter((x) => x.nombre !== nombre)), []);
  const limpiar = useCallback(() => { setIngredientes([]); setRecetas([]); }, []);

  // Solo los reconocidos se envían al motor.
  const reconocidos = useMemo(
    () => ingredientes.filter((x) => x.metodo !== 'desconocido').map((x) => x.nombre),
    [ingredientes]
  );

  const valor = {
    ingredientes, reconocidos, incluirBasicos, recetas,
    agregar, quitar, limpiar, setIncluirBasicos, setRecetas,
  };
  return <BusquedaContext.Provider value={valor}>{children}</BusquedaContext.Provider>;
}

export function useBusqueda() {
  const ctx = useContext(BusquedaContext);
  if (!ctx) throw new Error('useBusqueda debe usarse dentro de <BusquedaProvider>');
  return ctx;
}
