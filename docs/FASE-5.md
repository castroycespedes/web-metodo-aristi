# Fase 5 - Galeria de entrenamientos

Se creo una galeria visual para mostrar sesiones de entrenamiento.

## Incluye

- Grid responsive tipo masonry.
- Hover zoom.
- Overlay oscuro.
- Efecto cinematico con bordes neon.
- Cards de diferentes alturas.
- Rutas listas para reemplazar por fotos reales.

## Rutas de imagenes actuales

- `frontend/public/images/provided/coach-kids-session.svg`
- `frontend/public/images/provided/cones-ball-drill.svg`
- `frontend/public/images/suggested/coordination-session.svg`
- `frontend/public/images/suggested/game-decision.svg`
- `frontend/public/images/suggested/technique-session.svg`

Cuando tengas fotos reales, reemplaza los archivos o actualiza `galleryItems` en
`frontend/src/app/page.tsx`.

## Verificacion

```bash
npm run build:frontend
npm --prefix frontend run lint
```
