# Spec — Página de Detalle de Plantilla (ruta por slug)

## Visión

Hoy el detalle de una plantilla se abre en un modal (`<dialog>`) dentro de la home, en estado
local del cliente. No es enlazable, compartible ni indexable. Reemplazar ese modal por una
página propia y direccionable en `/templates/[slug]`.

## Funcionalidades

### Ruta de detalle (`/templates/[slug]`)
- Server Component que lee la plantilla por `slug` desde Supabase (service-role, sin auth)
  usando `getTemplateBySlugGlobal`
- Muestra: `name`, `slug` (en mono), `layout_id`, `width × height`, lista de `layers` (name + type)
- Reutiliza el markup/estilos que tenía el modal para mantener consistencia visual
- Enlace "← Volver" hacia `/`
- `generateMetadata` fija el `<title>` con el nombre de la plantilla

### Galería (home)
- Cada card pasa de abrir un modal a ser un `<Link>` hacia `/templates/[slug]`
- Se elimina el modal y el estado local; el componente deja de ser client component

### Estado 404
- Si no existe plantilla con ese `slug`, se llama a `notFound()` (página 404 de Next.js)

### Estado de error
- Si Supabase falla, la página muestra el mismo bloque de error descriptivo de la home
- La página no crashea

## Qué NO se implementa
- Modal interceptor / parallel routes (la card hace navegación completa)
- Autenticación (la ruta es pública)
- Cambios en el pipeline renderer o el endpoint `/api/v1/images`
- Dependencias nuevas

## Criterios de aceptación
- Click en una card navega a `/templates/<slug>` y muestra toda la info
- Acceso directo a `/templates/<slug>` (deep link) renderiza la página
- `/templates/<slug-inexistente>` devuelve 404
- El modal ya no existe en la home
- Estado de error visible si Supabase falla

## Golden path E2E
1. Navegar a `/`
2. Click en la primera card
3. Verificar URL `/templates/<slug>` y datos name/slug/layout/dimensiones/layers
4. Click en "← Volver" → vuelve a `/`
5. Navegar a `/templates/no-existe` → ver 404
