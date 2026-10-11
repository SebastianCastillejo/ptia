import { IconoPlato } from './Iconos.jsx';
import s from './FotoReceta.module.css';

const TINTES = ['#F3D9B8', '#DCE8C9', '#F6CDBF', '#D6E3EA', '#EADFC9'];

// Muestra la foto si el backend la envía; si no, un espacio reservado con color.
export default function FotoReceta({ url, nombre, indice = 0, grande = false }) {
  const clase = `${s.foto} ${grande ? s.grande : s.miniatura}`;
  if (url) return <img className={clase} src={url} alt={nombre} />;
  return (
    <div className={clase} style={{ background: TINTES[indice % TINTES.length] }} role="img" aria-label={`Sin foto de ${nombre}`}>
      <IconoPlato size={grande ? 54 : 28} />
    </div>
  );
}
