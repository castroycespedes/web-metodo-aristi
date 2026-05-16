# Fase 1 - Sistema visual y branding

Identidad visual inspirada en la guia enviada: futbol nocturno, negro profundo, aqua neon,
contraste alto, glow y tipografia deportiva condensada.

## Tema visual

- Fondo principal: `brand.black` / `#010303`.
- Paneles: `brand.graphite` y `brand.panel`.
- Color corporativo principal: `brand.cyan` / aqua neon.
- Soporte: `brand.steel`, `brand.line`, `brand.white`.
- Sombras: `shadow-glow`, `shadow-glow-strong`, `shadow-insetGlow`.
- Gradientes: `bg-aqua-sweep`, `bg-neon-radial`, `bg-field-lines`, `bg-dark-section`.
- Efectos: neon text, neon border, scan line y panel deportivo.

## Tailwind

Configurado en `frontend/tailwind.config.ts`:

- Custom colors corporativos.
- Breakpoints `xs`, `sm`, `md`, `lg`, `xl`, `2xl`.
- Spacing extendido: `18`, `22`, `30`, `34`.
- Animaciones: `pulse-glow`, `scan-line`, `float`.
- Backgrounds deportivos y neon.

## Componentes base

Ubicacion: `frontend/src/components/ui`.

- `Button` y `ButtonLink`.
- `SectionTitle`.
- `Container`.
- `Card`.
- `SocialButton`.
- `WhatsAppFloatingButton`.

## Aplicacion visual

- Navbar oscuro responsive con marca estilo deportivo.
- Footer moderno con social buttons.
- Home redisenada con hero neon, pilares, metodo, sobre mi, testimonios,
  entrenamientos y CTA final.

## Verificacion

```bash
npm run build:frontend
npm --prefix frontend run lint
```

Verificado en navegador local:

- `http://localhost:3001`
- Hero principal renderizado.
- CTAs renderizados.
- Boton flotante de WhatsApp renderizado.
