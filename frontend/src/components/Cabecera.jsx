import { useNavigate } from 'react-router-dom';
import { IconoAtras } from './Iconos.jsx';
import s from './Cabecera.module.css';

export default function Cabecera({ titulo, volverA, etiquetaVolver = 'Volver' }) {
  const navigate = useNavigate();
  return (
    <header className={s.cabecera}>
      <button type="button" className={s.atras} onClick={() => navigate(volverA)} aria-label={etiquetaVolver}>
        <IconoAtras />
      </button>
      {titulo && <h1 className={s.titulo}>{titulo}</h1>}
    </header>
  );
}
