import { useNavigate, useParams } from 'react-router-dom';
import FotoReceta from '../components/FotoReceta.jsx';
import CajaExplicacion from '../components/CajaExplicacion.jsx';
import ListaIngredientes from '../components/ListaIngredientes.jsx';
import PasosPreparacion from '../components/PasosPreparacion.jsx';
import Mensaje from '../components/Mensaje.jsx';
import { IconoAtras } from '../components/Iconos.jsx';
import { useBusqueda } from '../context/BusquedaContext.jsx';
import { useReceta } from '../hooks/useReceta.js';
import s from './DetalleReceta.module.css';

// Pantalla 3: detalle de la receta. Une la recomendación (qué tiene / qué falta)
// con los datos completos de la receta (pasos).
export default function DetalleReceta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recetas, limpiar } = useBusqueda();
  const { receta, cargando, error } = useReceta(id);
  const posicion = recetas.findIndex((r) => r.id === id);
  const recomendacion = recetas[posicion];

  const volver = (
    <button type="button" className={s.atras} onClick={() => navigate(recomendacion ? '/resultados' : '/')} aria-label="Volver a resultados">
      <IconoAtras />
    </button>
  );

  if (cargando) return <div className={s.estado}>{volver}<Mensaje tipo="cargando">Cargando receta…</Mensaje></div>;
  if (error) return <div className={s.estado}>{volver}<Mensaje tipo="error">{error}</Mensaje></div>;

  return (
    <article className={s.pantalla}>
      <div className={s.portada}>
        <FotoReceta url={receta.imagenUrl} nombre={receta.nombre} indice={Math.max(posicion, 0)} grande />
        {volver}
      </div>

      <div className={s.cuerpo}>
        <header className={s.encabezado}>
          <h1 className={s.titulo}>{receta.nombre}</h1>
          <div className={s.datos}>
            {recomendacion && <span className={s.cobertura}>{Math.round(recomendacion.cobertura * 100)}% de cobertura</span>}
            <span className={s.tiempo}>{receta.tiempoMin} min</span>
          </div>
        </header>

        {recomendacion && <CajaExplicacion texto={recomendacion.explicacion} />}
        {recomendacion && <ListaIngredientes ingredientes={recomendacion.ingredientes} />}
        <PasosPreparacion pasos={receta.pasos} />

        <button type="button" className={s.nueva} onClick={() => { limpiar(); navigate('/'); }}>Nueva búsqueda</button>
      </div>
    </article>
  );
}
