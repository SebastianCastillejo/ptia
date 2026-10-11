import s from './ListaIngredientes.module.css';

const ETIQUETA = {
  tiene: () => 'Tienes',
  sustituto: (i) => `Usa ${i.sustituto}`,
  despensa: () => 'Despensa',
  falta: () => 'Falta',
};

export default function ListaIngredientes({ ingredientes }) {
  return (
    <section className={s.bloque}>
      <h2 className={s.titulo}>Ingredientes</h2>
      <ul className={s.lista}>
        {ingredientes.map((i) => (
          <li key={i.nombre} className={s.fila}>
            <span>{i.nombre}</span>
            {i.estado && <span className={`${s.estado} ${s[i.estado]}`}>{ETIQUETA[i.estado](i)}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
