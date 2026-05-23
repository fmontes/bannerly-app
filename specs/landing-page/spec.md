# Spec — Landing Page con galería de plantillas

## Qué hace

Reemplaza el placeholder Hello World de la home (`app/page.tsx`) por una landing pública que muestra las plantillas disponibles en una grilla de cards con modal de detalle.

## Qué NO hace

- No requiere autenticación.
- No toca `lib/renderer/` ni el endpoint `/api/v1/images`.
- No añade dependencias nuevas.

## Componentes

### `app/page.tsx` (Server Component)
- Obtiene la lista de templates de Supabase.
- Renderiza el Hero y pasa los templates al Client Component `TemplateGallery`.

### `components/templates/template-gallery.tsx` (Client Component)
- Grilla responsive de cards: `name`, `slug` (mono), `width × height`.
- Click en card abre modal con toda la info: `name`, `slug`, `layout_id`, `width × height`, capas (`name`, `type`).
- Modal se cierra con botón X, click en backdrop, o tecla Escape.

## Estados

- **Con datos**: grilla de cards visible.
- **Vacío**: mensaje amable invitando a crear una plantilla.
- **Error Supabase**: banner de error (sin crashear).

## Aceptación

- [ ] La home renderiza la grilla sin mostrar JSON crudo.
- [ ] Click en card abre modal con info completa.
- [ ] Modal se cierra con X, backdrop, y Escape.
- [ ] Con tabla vacía se ve el estado vacío.
- [ ] Con Supabase caído se ve el estado de error.

## Golden path E2E

1. Navegar a `/` y verificar hero + galería visibles.
2. Click en la primera card.
3. Verificar que el modal aparece con `name`/`slug` del template.
4. Cerrar modal y verificar que desaparece.
