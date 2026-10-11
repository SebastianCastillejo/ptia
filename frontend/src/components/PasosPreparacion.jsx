import s from './PasosPreparacion.module.css';

export default function PasosPreparacion({ pasos }) {
  return (
    <section className={s.bloque}>
      <h2 className={s.titulo}>Preparación paso a paso</h2>
      <ol className={s.lista}>
        {pasos.map((p, i) => (
          <li key={i} className={s.paso}>
            <span className={s.numero} aria-hidden="true">{i + 1}</span>
            <span className={s.texto}>{p}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
