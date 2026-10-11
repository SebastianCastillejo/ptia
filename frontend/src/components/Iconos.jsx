// Íconos de trazo, heredan el color del texto.
const base = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const IconoOlla = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.8" {...base}>
    <path d="M3 11h18" /><path d="M5 11v6a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-6" />
    <path d="M8 7c0-1.5 1-2 1-3.5M12 7c0-1.5 1-2 1-3.5M16 7c0-1.5 1-2 1-3.5" />
  </svg>
);
export const IconoAtras = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="2.2" {...base}><path d="M15 18l-6-6 6-6" /></svg>
);
export const IconoCerrar = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="3" {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const IconoPlato = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" {...base}>
    <path d="M3 12h18a9 9 0 0 1-18 0z" /><path d="M9 8c0-1 1-1.5 1-3M14 8c0-1 1-1.5 1-3" />
  </svg>
);
