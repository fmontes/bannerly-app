import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: templates, error } = await supabase
    .from("templates")
    .select("id, name, slug, width, height")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 font-mono">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Bannerly
        </h1>
        <p className="max-w-xl text-base text-zinc-400 sm:text-lg">
          Generación de imágenes dinámicas vía API. Diseña una plantilla una
          vez, renderiza miles de variantes a escala.
        </p>
        <Link
          href="/dashboard/templates"
          className="rounded-lg bg-zinc-50 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
        >
          Ver plantillas →
        </Link>
      </section>

      {/* Templates gallery */}
      <section
        aria-label="Galería de plantillas"
        className="mx-auto max-w-5xl px-6 pb-24"
      >
        <h2 className="mb-8 text-xl font-semibold text-zinc-300">
          Plantillas disponibles
        </h2>

        {error ? (
          <div className="rounded-lg border border-red-800 bg-red-950 p-4 text-red-400">
            <p className="font-semibold">Error de conexión</p>
            <p className="mt-1 text-sm">{error.message}</p>
          </div>
        ) : templates && templates.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((tpl) => (
              <li
                key={tpl.id}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-zinc-600"
              >
                <p className="text-base font-semibold text-zinc-50">
                  {tpl.name}
                </p>
                <p className="mt-1 text-sm text-zinc-400">{tpl.slug}</p>
                <p className="mt-3 text-xs text-zinc-500">
                  {tpl.width} × {tpl.height}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
            <p className="text-base font-medium">No hay plantillas todavía.</p>
            <p className="mt-2 text-sm">
              Crea tu primera plantilla desde el{" "}
              <Link
                href="/dashboard/templates"
                className="text-zinc-200 underline underline-offset-2 hover:text-zinc-50"
              >
                dashboard
              </Link>
              .
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
