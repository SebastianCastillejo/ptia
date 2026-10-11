import s from './BarraCobertura.module.css';

export default function BarraCobertura({ valor }) {
  const pct = Math.round(valor * 100);
  return (
    <div className={s.fila}>
      <div className={s.pista} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Cobertura de la receta">
        <div className={s.relleno} style={{ width: `${pct}%` }} />
      </div>
      <span className={s.numero}>{pct}%</span>
    </div>
  );
}
