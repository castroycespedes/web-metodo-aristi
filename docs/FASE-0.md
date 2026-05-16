# Fase 0 - Arquitectura inicial

Base profesional del proyecto Metodo Aristi.

## Frontend

- Next.js App Router en `frontend`.
- TailwindCSS configurado con variables globales de color.
- Layout global con SEO base.
- Tipografias deportivas: `Bebas Neue` para titulares e `Inter` para texto.
- Navbar responsive.
- Footer moderno.
- Pagina inicial responsive lista para evolucionar por fases.

## Backend

- NestJS limpio en `backend`.
- Configuracion global con `@nestjs/config`.
- CORS controlado desde `FRONTEND_URL`.
- Prefijo global `/api`.
- Healthcheck: `GET /api/health`.
- Contacto: `POST /api/contact`.

## Variables de entorno

Copiar los archivos de ejemplo antes de ejecutar:

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

En Windows PowerShell:

```powershell
Copy-Item frontend/.env.example frontend/.env.local
Copy-Item backend/.env.example backend/.env
```

## Ejecucion local

Instalar dependencias desde la raiz:

```bash
npm install
```

Ejecutar frontend:

```bash
npm run dev:frontend
```

Ejecutar backend:

```bash
npm run dev:backend
```
