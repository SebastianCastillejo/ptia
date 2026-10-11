import { useState } from 'react';
import s from './EntradaIngrediente.module.css';

export default function EntradaIngrediente({ onAgregar }) {
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function enviar(e) {
    e.preventDefault();
    if (!texto.trim() || enviando) return;
    setEnviando(true);
    try {
      await onAgregar(texto);
      setTexto('');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className={s.bloque} onSubmit={enviar}>
      <label htmlFor="ingrediente" className={s.etiqueta}>Agregar ingrediente</label>
      <div className={s.fila}>
        <input
          id="ingrediente"
          className={s.campo}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Ej: tomate, arroz, pollo"
          autoComplete="off"
        />
        <button type="submit" className={s.boton} disabled={enviando}>Agregar</button>
      </div>
      <span className={s.ayuda}>Puedes separar varios con comas. Entendemos sinónimos y errores comunes.</span>
    </form>
  );
}
