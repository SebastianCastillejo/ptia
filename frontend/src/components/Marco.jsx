import s from './Marco.module.css';

// Contenedor de la app: columna de celular centrada, con margen para las barras del sistema.
export default function Marco({ children }) {
  return <div className={s.marco}><main className={s.contenido}>{children}</main></div>;
}
