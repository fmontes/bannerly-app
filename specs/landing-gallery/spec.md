# Spec — Landing con galería de plantillas

> Metodología SDD. Scope: issue #3.

---

## SECCIÓN 1 — Visión del producto

Reemplazar el placeholder "Hello World" de `app/page.tsx` por una landing pública real que comunique el propósito de Bannerly y muestre las plantillas disponibles en una grilla de cards. La página es pública (no requiere auth).

---

## SECCIÓN 2 — Casos de uso

**Visitante anónimo:** llega a la home, entiende qué es Bannerly, ve las plantillas disponibles y puede navegar al dashboard.

**Sistema:** lee plantillas desde Supabase (Server Component), renderiza la grilla o un estado vacío/error según el resultado.

---

## SECCIÓN 3 — Funcionalidades

**Hero:**
- Título "Bannerly".
- Tagline: "Generación de imágenes dinámicas vía API. Diseña una plantilla una vez, renderiza miles de variantes a escala."
- CTA button hacia `/dashboard/templates`.

**Galería de plantillas:**
- Grilla responsive de cards.
- Cada card muestra: `name`, `slug` (en mono), `width × height`.
- Datos leídos desde la tabla `templates` de Supabase (Server Component, sin auth).

**Estado vacío:**
- Si no hay plantillas: mensaje amable invitando a crear una.
- No muestra JSON crudo ni error.

**Estado de error:**
- Si Supabase no responde: bloque de error con mensaje, sin crashear la página.

## SECCIÓN 4 — Qué NO hacer

- No tocar `lib/renderer/` ni `app/api/v1/images/`.
- No agregar dependencias nuevas; usar Tailwind v4.
- No requerir auth.

---

## SECCIÓN 5 — Criterios de aceptación

- [ ] La home renderiza la grilla sin mostrar JSON crudo.
- [ ] Con tabla vacía se muestra el estado vacío, no un error.
- [ ] Con Supabase caído se muestra el estado de error (página no crashea).
- [ ] El golden path E2E navega a la home, verifica el hero y el contenedor de la galería.
