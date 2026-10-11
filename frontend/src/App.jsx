import { Routes, Route, Navigate } from 'react-router-dom';
import Marco from './components/Marco.jsx';
import Inicio from './pages/Inicio.jsx';
import Resultados from './pages/Resultados.jsx';
import DetalleReceta from './pages/DetalleReceta.jsx';

// Pantallas del prototipo: 1 Inicio · 2 Resultados · 3 Detalle de receta
export default function App() {
  return (
    <Marco>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/receta/:id" element={<DetalleReceta />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Marco>
  );
}
