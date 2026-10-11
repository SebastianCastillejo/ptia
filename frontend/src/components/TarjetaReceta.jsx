import { Link } from 'react-router-dom';
import BarraCobertura from './BarraCobertura.jsx';
import FotoReceta from './FotoReceta.jsx';
import s from './TarjetaReceta.module.css';

export default function TarjetaReceta({ receta, posicion, ocultarBasicos }) {
  const faltantes = receta.faltantes.filter((f) => !(ocultarBasicos && ['sal', 'aceite', 'agua'].includes(f)));
  return (
    <Link to={`/receta/${receta.id}`} className={s.tarjeta}>
      <FotoReceta url={receta.imagenUrl} nombre={receta.nombre} indice={posicion - 1} />
      <div className={s.info}>
        <div className={s.encabezado}>
          <span className={s.nombre}>{posicion}. {receta.nombre}</span>
          <span className={s.tiempo}>{receta.tiempoMin} min</span>
        </div>
        <BarraCobertura valor={receta.cobertura} />
        <span className={s.detalle}>Usa {receta.usados} de {receta.totalUsuario} de tus ingredientes</span>
        <span className={s.falta}>{faltantes.length ? `Te falta: ${faltantes.join(', ')}` : 'Tienes todo'}</span>
      </div>
    </Link>
  );
}
