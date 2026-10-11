# Frontend · Aprovecha

React 18 + Vite 5 + React Router 6. Sin librerías de UI: CSS Modules con los tokens del prototipo.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en http://localhost:5173 |
| `npm run build` | Compila a `dist/` |
| `npm run preview` | Sirve la compilación para probarla |

## Variables (`.env`)

| Variable | Valor por defecto | Para qué |
|---|---|---|
| `VITE_USE_MOCK` | `true` | `true` usa el motor simulado; `false` llama al backend |
| `VITE_BACKEND_URL` | `http://localhost:8000` | A dónde manda el proxy de Vite las llamadas `/api` |
| `VITE_API_BASE_URL` | vacío | Solo si el front se publica en otro dominio que el back |

## Arquitectura

```
src/
├── main.jsx                 Punto de entrada: router + estado global
├── App.jsx                  Rutas: /  ·  /resultados  ·  /receta/:id
├── pages/                   Una por pantalla del prototipo
│   ├── Inicio.jsx           1. ¿Qué tienes en tu cocina?
│   ├── Resultados.jsx       2. Recetas sugeridas
│   └── DetalleReceta.jsx    3. Detalle, explicación, ingredientes y pasos
├── components/              Piezas reutilizables (cada una con su .module.css)
├── context/
│   └── BusquedaContext.jsx  Ingredientes, interruptor de despensa y últimas recetas
├── hooks/                   useRecomendaciones, useReceta, useSugerencias
├── api/
│   ├── recetasApi.js        ÚNICA puerta a los datos (mock o backend)
│   ├── client.js            fetch con errores y tiempo límite
│   ├── config.js            Lee las variables de entorno
│   └── mock/                Datos y motor simulado (misma fórmula del documento)
└── styles/
    ├── tokens.css           Colores, tipografías, radios y espacios
    └── global.css
```

Flujo de datos:

```
Página ──> hook ──> recetasApi.js ──┬──> mock/  (VITE_USE_MOCK=true)
                                     └──> client.js ──> /api ──> FastAPI
```

Reglas para que la conexión con el back sea un cambio de una línea:

- Los componentes y páginas **nunca** llaman `fetch` directamente; siempre pasan por `recetasApi.js`.
- El mock devuelve exactamente las formas de `docs/contrato-api.md`. Si el contrato cambia,
  se actualiza primero el documento, luego el mock y luego el backend.
- El detalle de la receta combina dos fuentes: la recomendación guardada en el contexto
  (qué tiene, qué falta, explicación) y `GET /api/recetas/{id}` (pasos y porciones).

## Agregar una pantalla

1. Crear `src/pages/MiPantalla.jsx` y su `.module.css`.
2. Registrar la ruta en `App.jsx`.
3. Si necesita datos nuevos: agregar la función en `recetasApi.js`, su versión en `mock/mockServer.js`
   y documentar el endpoint en `docs/contrato-api.md`.
