import s from './SugerenciasRapidas.module.css';

export default function SugerenciasRapidas({ opciones, onElegir }) {
  if (!opciones.length) return null;
  return (
    <section className={s.bloque} aria-labelledby="sugerencias-titulo">
      <h2 id="sugerencias-titulo" className={s.titulo}>Sugerencias rápidas</h2>
      <div className={s.lista}>
        {opciones.map((o) => (
          <button key={o} type="button" className={s.opcion} onClick={() => onElegir(o)}>+ {o}</button>
        ))}
      </div>
    </section>
  );
}
