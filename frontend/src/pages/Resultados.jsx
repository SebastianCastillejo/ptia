import { Navigate, useNavigate } from 'react-router-dom';
import Cabecera from '../components/Cabecera.jsx';
import TarjetaReceta from '../components/TarjetaReceta.jsx';
import Mensaje from '../components/Mensaje.jsx';
import { useBusqueda } from '../context/BusquedaContext.jsx';
import { useRecomendaciones } from '../hooks/useRecomendaciones.js';
import s from './Resultados.module.css';

// Pantalla 2: las cinco recetas que mejor aprovechan lo que tiene el usuario.
export default function Resultados() {
  const navigate = useNavigate();
  const { reconocidos, incluirBasicos } = useBusqueda();
  const { recetas, cargando, error, reintentar } = useRecomendaciones();

  if (!reconocidos.length) return <Navigate to="/" replace />;

  return (
    <div className={s.pantalla}>
      <Cabecera titulo="Recetas sugeridas" volverA="/" etiquetaVolver="Volver a ingredientes" />
      <p className={s.con}>Con: {reconocidos.join(', ')}{incluirBasicos ? ' (+ básicos de despensa)' : ''}</p>

      <div className={s.lista}>
        {cargando && <Mensaje tipo="cargando">Buscando recetas…</Mensaje>}
        {!cargando && error && <Mensaje tipo="error" accion="Intentar de nuevo" onAccion={reintentar}>{error}</Mensaje>}
        {!cargando && !error && recetas.length === 0 && (
          <Mensaje accion="Agregar ingredientes" onAccion={() => navigate('/')}>
            Ninguna receta usa al menos la mitad de sus ingredientes con lo que tienes. Agrega uno o dos ingredientes más.
          </Mensaje>
        )}
        {!cargando && !error && recetas.map((r, i) => (
          <TarjetaReceta key={r.id} receta={r} posicion={i + 1} ocultarBasicos={incluirBasicos} />
        ))}
      </div>
    </div>
  );
}
