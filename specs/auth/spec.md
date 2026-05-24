# Spec — Auth (Login / Register)

> Issue #10 — feat: Login / Register auth

---

## SECCIÓN 1 — Visión del producto

Bannerly necesita un flujo de autenticación completo para que los usuarios puedan acceder de forma segura al dashboard. Sin login/register, no es posible proteger las rutas ni asociar templates, API keys y generaciones a un usuario específico.

---

## SECCIÓN 2 — Usuarios y casos de uso

**Usuario nuevo:** registrarse con email + contraseña para obtener acceso al dashboard.

**Usuario existente:** iniciar sesión con email + contraseña y ser redirigido al dashboard.

**Usuario autenticado:** cerrar sesión borrando la cookie de sesión.

**Sistema:** redirigir a `/login` cualquier request no autenticado a `/dashboard/*`.

---

## SECCIÓN 3 — Funcionalidades

- Página `/register` con formulario de email + contraseña que llama a `supabase.auth.signUp`.
- Página `/login` con formulario de email + contraseña que llama a `supabase.auth.signInWithPassword`.
- Middleware en `middleware.ts` que protege `/dashboard/*` redirigiendo a `/login` si no hay sesión.
- Server Action `logout` que llama a `supabase.auth.signOut` y redirige a `/login`.
- Mensajes de error inline cuando las credenciales son inválidas.

---

## SECCIÓN 4 — Flujos de usuario

**Registro:**
1. Usuario visita `/register`.
2. Completa email + contraseña.
3. El sistema crea el usuario en Supabase Auth.
4. Redirige a `/dashboard/templates`.
- Error: email ya registrado → mensaje inline.

**Login:**
1. Usuario visita `/login`.
2. Completa email + contraseña.
3. El sistema establece la sesión vía cookie.
4. Redirige a `/dashboard/templates`.
- Error: credenciales inválidas → mensaje inline.

**Logout:**
1. Usuario hace clic en "Salir" desde el dashboard.
2. El sistema llama `signOut` y redirige a `/login`.

**Ruta protegida:**
1. Usuario no autenticado intenta acceder a `/dashboard/*`.
2. El middleware redirige a `/login`.

---

## SECCIÓN 5 — Arquitectura

- `app/(auth)/login/page.tsx` — página de login (Client Component)
- `app/(auth)/register/page.tsx` — página de registro (Client Component)
- `app/(auth)/layout.tsx` — layout compartido para páginas auth
- `app/(auth)/actions.ts` — Server Actions: login, register, logout
- `middleware.ts` — en raíz del proyecto, usa `createServerClient` para verificar sesión

---

## SECCIÓN 6 — Requisitos no funcionales

- Contraseña mínimo 6 caracteres (restricción de Supabase Auth).
- Cookies de sesión son httpOnly, gestionadas por `@supabase/ssr`.
- El middleware no bloquea rutas públicas (`/`, `/login`, `/register`, `/api/v1/*`).
