import s from './Mensaje.module.css';

// Estados de carga, vacío y error, con una acción opcional.
export default function Mensaje({ tipo = 'info', children, accion, onAccion }) {
  return (
    <div className={`${s.mensaje} ${s[tipo]}`} role={tipo === 'error' ? 'alert' : 'status'}>
      <p>{children}</p>
      {accion && <button type="button" className={s.accion} onClick={onAccion}>{accion}</button>}
    </div>
  );
}
