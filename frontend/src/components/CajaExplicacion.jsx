import s from './CajaExplicacion.module.css';

export default function CajaExplicacion({ texto }) {
  return (
    <aside className={s.caja}>
      <span className={s.titulo}>¿Por qué te la recomendamos?</span>
      <p className={s.texto}>{texto}</p>
    </aside>
  );
}
