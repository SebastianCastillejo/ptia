import { IconoCerrar } from './Iconos.jsx';
import s from './ChipIngrediente.module.css';

const NOTAS = {
  sinonimo: (e) => `escribiste «${e}»`,
  plural: (e) => `escribiste «${e}»`,
  correccion: (e) => `corregido de «${e}»`,
  desconocido: () => 'no reconocido, se ignora',
};

export default function ChipIngrediente({ ingrediente, onQuitar }) {
  const { nombre, entrada, metodo } = ingrediente;
  const nota = NOTAS[metodo]?.(entrada);
  const desconocido = metodo === 'desconocido';
  return (
    <span className={`${s.chip} ${desconocido ? s.desconocido : ''}`}>
      <span className={s.texto}>
        <span>{nombre}</span>
        {nota && <span className={s.nota}>{nota}</span>}
      </span>
      <button type="button" className={s.quitar} onClick={() => onQuitar(nombre)} aria-label={`Quitar ${nombre}`}>
        <IconoCerrar />
      </button>
    </span>
  );
}
