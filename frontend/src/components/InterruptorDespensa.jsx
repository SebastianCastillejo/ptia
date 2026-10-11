import s from './InterruptorDespensa.module.css';

export default function InterruptorDespensa({ activo, onCambiar }) {
  return (
    <label className={s.caja}>
      <input type="checkbox" className={s.check} checked={activo} onChange={(e) => onCambiar(e.target.checked)} />
      <span className={s.textos}>
        <span className={s.titulo}>Tengo sal, aceite y agua</span>
        <span className={s.ayuda}>Los básicos de despensa no cuentan como faltantes.</span>
      </span>
    </label>
  );
}
