# Spec — Landing con galería de plantillas

## SECCIÓN 1 — Visión del producto

Reemplazar el placeholder de la home con una landing pública real que muestre las plantillas disponibles en una grilla de cards, con hero, estado vacío y manejo de errores de conexión.

---

## SECCIÓN 2 — Usuarios y casos de uso

**Visitante público:** llega a la home, ve el hero de Bannerly con tagline y CTA, y una galería de las plantillas disponibles.

**Sistema:** lee las plantillas desde Supabase como Server Component; maneja estado vacío y errores de conexión sin crashear.

---

## SECCIÓN 3 — Funcionalidades

- **Hero:** título "Bannerly", tagline del README, CTA a `/dashboard/templates`.
- **Galería:** grilla responsive de cards. Cada card muestra `name`, `slug` (mono), y dimensiones `width × height`.
- **Estado vacío:** si no hay plantillas, mensaje amable invitando a crear una.
- **Estado de error:** si Supabase falla, mensaje de error — la página no crashea.

## SECCIÓN 4 — Qué NO hacer

- No tocar `lib/renderer/` ni `/api/v1/images`.
- No agregar dependencias nuevas.
- No requerir auth.

## SECCIÓN 5 — Criterios de aceptación

- La home renderiza la grilla de plantillas sin mostrar JSON crudo.
- Con tabla vacía se ve el estado vacío, no un error.
- Con Supabase caído se ve el estado de error (la página no crashea).
- El golden path E2E navega a la home, verifica el hero y el contenedor de la galería.
