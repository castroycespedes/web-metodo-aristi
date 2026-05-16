# Fase 9 - Formulario de contacto frontend

Formulario responsive conectado al endpoint de contacto.

## Campos

- Nombre.
- Telefono.
- Edad.
- Mensaje.

## Incluye

- Validaciones frontend.
- Estado loading.
- Toast notifications.
- Envio a `POST /api/contact` en Next, con proxy interno hacia Nest.
- Ajuste backend para aceptar `phone` y `age`.

## Archivos

- `frontend/src/components/sections/contact-form.tsx`
- `frontend/src/app/api/contact/route.ts`
- `frontend/src/app/page.tsx`
- `backend/src/contact/dto/create-contact.dto.ts`
- `backend/src/contact/contact.service.ts`

## Verificacion

```bash
npm run build:frontend
npm --prefix frontend run lint
npm run build:backend
npm --prefix backend run lint
```
