# Contrato entre el front y el back

El front habla con el backend **solo** a través de `frontend/src/api/recetasApi.js`.
Mientras `VITE_USE_MOCK=true`, esas funciones responden desde `src/api/mock/` con exactamente
las formas de abajo. Cuando el backend (FastAPI) cumpla este contrato, basta con poner
`VITE_USE_MOCK=false` en `frontend/.env`.

- Base: `/api` (en desarrollo, Vite redirige `/api` a `http://localhost:8000`).
- Formato: JSON, nombres de campos en `camelCase`.
- Errores: código HTTP ≠ 2xx con cuerpo `{ "detail": "mensaje legible para el usuario" }`
  (es el formato por defecto de FastAPI con `HTTPException`).

---

## 1. Normalizar ingredientes

`POST /api/ingredientes/normalizar`

```json
{ "texto": "arroz, jitomate, cebolla de huevo, arros, xyz" }
```

Respuesta `200`:

```json
{
  "ingredientes": [
    { "entrada": "arroz",            "nombre": "arroz",            "metodo": "exacto" },
    { "entrada": "jitomate",         "nombre": "tomate",           "metodo": "sinonimo" },
    { "entrada": "cebolla de huevo", "nombre": "cebolla cabezona", "metodo": "sinonimo" },
    { "entrada": "arros",            "nombre": "arroz",            "metodo": "correccion" },
    { "entrada": "xyz",              "nombre": "xyz",              "metodo": "desconocido" }
  ]
}
```

`metodo` ∈ `exacto | sinonimo | plural | correccion | desconocido`. Los `desconocido` se muestran
al usuario pero no se envían a las recomendaciones.

## 2. Recomendaciones

`POST /api/recomendaciones`

```json
{ "ingredientes": ["arroz", "pollo", "tomate", "cebolla cabezona"], "incluirBasicos": true, "limite": 5 }
```

Respuesta `200` (ordenada por `utilidad`, de mayor a menor):

```json
{
  "recetas": [
    {
      "id": "arroz-con-pollo",
      "nombre": "Arroz con pollo",
      "tiempoMin": 40,
      "imagenUrl": null,
      "cobertura": 0.682,
      "aprovechamiento": 1.0,
      "utilidad": 0.609,
      "usados": 4,
      "totalUsuario": 4,
      "faltantes": ["zanahoria", "pimentón"],
      "sustituciones": [{ "necesita": "cebolla larga", "usar": "cebolla cabezona", "confianza": 0.9 }],
      "ingredientes": [
        { "nombre": "arroz",         "tipo": "principal", "estado": "tiene" },
        { "nombre": "cebolla larga", "tipo": "principal", "estado": "sustituto", "sustituto": "cebolla cabezona" },
        { "nombre": "zanahoria",     "tipo": "principal", "estado": "falta" },
        { "nombre": "sal",           "tipo": "basico",    "estado": "despensa" }
      ],
      "explicacion": "Aprovecha 4 de tus 4 ingredientes y cubre el 68% de la receta. ..."
    }
  ]
}
```

- `cobertura`, `aprovechamiento`, `utilidad`: números entre 0 y 1 (fórmula de la sección 6.e del documento).
- `estado` ∈ `tiene | sustituto | despensa | falta`.
- Lista vacía si ninguna receta pasa la cobertura mínima (0,5). No es un error.

## 3. Detalle de receta

`GET /api/recetas/{id}`

```json
{
  "id": "arroz-con-pollo",
  "nombre": "Arroz con pollo",
  "tiempoMin": 40,
  "porciones": 4,
  "imagenUrl": null,
  "pasos": ["Sofríe la cebolla...", "Agrega el pollo..."]
}
```

`404` con `{ "detail": "No encontramos esa receta." }` si el id no existe.

## 4. Sugerencias rápidas

`GET /api/ingredientes/sugerencias`

```json
{ "ingredientes": ["huevo", "papa", "plátano verde", "zanahoria", "ajo", "pasta"] }
```

---

## Esqueleto sugerido en FastAPI

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel

class Modelo(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

class PedidoRecomendacion(Modelo):
    ingredientes: list[str]
    incluir_basicos: bool = True
    limite: int = 5

app = FastAPI()

@app.post("/api/recomendaciones")
def recomendaciones(pedido: PedidoRecomendacion):
    recetas = motor.recomendar(pedido.ingredientes, pedido.incluir_basicos, pedido.limite)
    return {"recetas": recetas}   # dicts con las llaves en camelCase de arriba

@app.get("/api/recetas/{id}")
def receta(id: str):
    r = repositorio.obtener(id)
    if r is None:
        raise HTTPException(404, "No encontramos esa receta.")
    return r
```

Correr con `uvicorn app.main:app --reload --port 8000`. Gracias al proxy de Vite no hace falta configurar CORS en desarrollo.

**Prueba de integración rápida:** con la lista `arroz, pollo, jitomate, cebolla de huevo` el motor real
debe devolver el mismo orden que el mock: Arroz con pollo, Huevos pericos, Patacones con hogao,
Lentejas con arroz, Pasta en salsa de tomate.
