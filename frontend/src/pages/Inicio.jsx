import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import EntradaIngrediente from '../components/EntradaIngrediente.jsx';
import ChipIngrediente from '../components/ChipIngrediente.jsx';
import SugerenciasRapidas from '../components/SugerenciasRapidas.jsx';
import InterruptorDespensa from '../components/InterruptorDespensa.jsx';
import { useBusqueda } from '../context/BusquedaContext.jsx';
import { useSugerencias } from '../hooks/useSugerencias.js';
import s from './Inicio.module.css';

// Pantalla 1: el usuario dice qué tiene en la cocina.
export default function Inicio() {
  const navigate = useNavigate();
  const { ingredientes, reconocidos, incluirBasicos, agregar, quitar, setIncluirBasicos } = useBusqueda();
  const sugerencias = useSugerencias().filter((x) => !reconocidos.includes(x)).slice(0, 6);
  const sinIngredientes = reconocidos.length === 0;

  return (
    <div className={s.pantalla}>
      <Logo />
      <div className={s.intro}>
        <h1 className={s.titulo}>¿Qué tienes en tu cocina?</h1>
        <p className={s.bajada}>Escribe tus ingredientes y te sugerimos recetas que aprovechen lo que ya compraste.</p>
      </div>

      <EntradaIngrediente onAgregar={agregar} />

      <section className={s.bloque} aria-labelledby="mis-ingredientes">
        <h2 id="mis-ingredientes" className={s.subtitulo}>Tus ingredientes ({reconocidos.length})</h2>
        {ingredientes.length ? (
          <div className={s.chips}>
            {ingredientes.map((i) => <ChipIngrediente key={i.nombre} ingrediente={i} onQuitar={quitar} />)}
          </div>
        ) : (
          <div className={s.vacio}>Todavía no has agregado ingredientes.</div>
        )}
      </section>

      <SugerenciasRapidas opciones={sugerencias} onElegir={agregar} />
      <InterruptorDespensa activo={incluirBasicos} onCambiar={setIncluirBasicos} />

      <div className={s.espaciador} />
      <button type="button" className={s.buscar} disabled={sinIngredientes} onClick={() => navigate('/resultados')}>
        Buscar recetas
      </button>
    </div>
  );
}
