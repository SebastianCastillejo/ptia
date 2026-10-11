import { IconoOlla } from './Iconos.jsx';
import s from './Logo.module.css';

export default function Logo() {
  return (
    <div className={s.logo}>
      <IconoOlla size={34} />
      <span className={s.nombre}>Aprovecha</span>
    </div>
  );
}
