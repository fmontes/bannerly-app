# Spec — Landing con galería de plantillas

## Visión

Reemplazar la home placeholder (`app/page.tsx`) por una landing pública que presente Bannerly con un hero y una galería de las plantillas disponibles.

## Funcionalidades

**Hero:**
- Título "Bannerly"
- Tagline: "Generación de imágenes dinámicas vía API. Diseña una plantilla una vez, renderiza miles de variantes a escala."
- CTA (enlace) hacia `/dashboard/templates`

**Galería de plantillas:**
- Server Component que consulta la tabla `templates` en Supabase (anon key, sin auth)
- Grilla responsive de cards; cada card muestra: `name`, `slug` (en mono), dimensiones `width × height`
- Estado vacío con mensaje amable si no hay plantillas

**Estado de error:**
- Si Supabase no responde, mostrar mensaje de error (no crashear la página)

## Qué NO hace

- No requiere auth
- No toca `lib/renderer/` ni `/api/v1/images`
- No agrega dependencias nuevas

## Criterios de aceptación

- La home renderiza la grilla sin mostrar JSON crudo
- Con tabla vacía se ve el estado vacío
- Con Supabase caído se ve el estado de error (página no crashea)
- El golden path navega a `/`, verifica el hero y el contenedor de la galería
