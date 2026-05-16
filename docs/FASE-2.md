# Fase 2 - Navbar y hero principal

Portada principal enfocada en impacto visual, conversion y responsive.

## Navbar

- Logo Metodo Aristi.
- Menu desktop horizontal.
- Menu mobile desplegable.
- CTA principal a WhatsApp: `Agenda tu clase`.
- Navbar fija con fondo oscuro translcido y blur.

## Hero

- Imagen fullscreen local: `frontend/public/images/hero-aristi.svg`.
- Overlay oscuro para legibilidad.
- Textos grandes con tipografia deportiva.
- Slogan principal: `Formamos jugadores tecnicos, creativos y sin miedo.`
- Boton WhatsApp principal: `Agenda tu clase`.
- Boton Instagram secundario.
- Animaciones `float` y `pulse-glow`.
- Responsive completo para mobile y desktop.

## Imagenes sugeridas

Se agregaron imagenes locales de referencia para mantener la pagina visual mientras llegan
las fotos reales. Pueden reemplazarse conservando el mismo nombre de archivo:

- `frontend/public/images/hero-aristi.svg`
- `frontend/public/images/provided/coach-kids-session.svg`
- `frontend/public/images/provided/cones-ball-drill.svg`
- `frontend/public/images/suggested/training-drills.svg`
- `frontend/public/images/suggested/coach-profile.svg`
- `frontend/public/images/suggested/technique-session.svg`
- `frontend/public/images/suggested/coordination-session.svg`
- `frontend/public/images/suggested/game-decision.svg`

Recomendacion para fotos reales: usar imagenes horizontales para hero y metodo, verticales
para tarjetas de entrenamiento, con fondo oscuro o cancha nocturna para conservar la paleta.

## CTA WhatsApp

Configuracion centralizada en `frontend/src/lib/site.ts`.

```ts
whatsapp: {
  phone: "3022243805",
  message: "Hola, quiero información sobre los entrenamientos"
}
```

URL generada:

```txt
https://wa.me/3022243805?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20entrenamientos
```

El numero se configura en un solo lugar: `frontend/src/lib/site.ts`.

## Verificacion

```bash
npm run build:frontend
npm --prefix frontend run lint
```

Tambien se verifico en navegador:

- Mobile: logo, menu mobile, hero, CTA WhatsApp, Instagram y boton flotante.
- Desktop: menu horizontal visible, boton mobile oculto y CTA en navbar.
