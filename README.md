# Aprovecha · Recomendador de recetas por ingredientes disponibles

Proyecto del curso PTIA (Escuela Colombiana de Ingeniería Julio Garavito), Grupo 03:
Sebastian Castillejo y Juan Vera.

El usuario escribe lo que tiene en la cocina y el sistema le recomienda las cinco recetas
que mejor lo aprovechan, con lo que le falta y qué puede sustituir.

## Estructura

```
ptia/
├── frontend/          Interfaz web (React + Vite), basada en el prototipo de interfaz
├── backend/           (por hacer) API en FastAPI + motor de recomendación
└── docs/
    └── contrato-api.md   Lo que el front espera del back
```

## Correr el front en local

Requisitos: Node.js 18 o superior.

```bash
cd frontend
cp .env.example .env      # en Windows: copy .env.example .env
npm install
npm run dev
```

Abrir http://localhost:5173. Por defecto funciona **sin backend** (`VITE_USE_MOCK=true`),
usando un motor simulado con 11 recetas de ejemplo.

## Conectar con el backend

1. Levantar la API en el puerto 8000 cumpliendo `docs/contrato-api.md`.
2. En `frontend/.env` poner `VITE_USE_MOCK=false`.
3. Reiniciar `npm run dev`. Las llamadas a `/api/...` se redirigen al backend.

Más detalle de la arquitectura del front en `frontend/README.md`.
