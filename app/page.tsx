import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: templates, error } = await supabase
    .from("templates")
    .select("id, name, slug, width, height")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-mono">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center gap-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Bannerly
        </h1>
        <p className="max-w-xl text-lg text-zinc-400 leading-relaxed">
          Generación de imágenes dinámicas vía API. Diseña una plantilla una
          vez, renderiza miles de variantes a escala.
        </p>
        <Link
          href="/dashboard/templates"
          className="inline-block rounded-md bg-zinc-50 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors"
        >
          Ver plantillas →
        </Link>
      </section>

      {/* Gallery */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-8 text-zinc-300">
          Plantillas disponibles
        </h2>

        {error ? (
          <div className="rounded-lg border border-red-800 bg-red-950 p-6 text-red-400">
            <p className="font-semibold">Error de conexión</p>
            <p className="mt-1 text-sm">{error.message}</p>
          </div>
        ) : templates && templates.length > 0 ? (
          <ul
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Galería de plantillas"
          >
            {templates.map((tpl) => (
              <li
                key={tpl.id}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 flex flex-col gap-2 hover:border-zinc-600 transition-colors"
              >
                <span className="text-base font-semibold text-zinc-100">
                  {tpl.name}
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  {tpl.slug}
                </span>
                <span className="text-xs text-zinc-500 mt-auto">
                  {tpl.width} × {tpl.height}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
            <p className="text-base">Aún no hay plantillas.</p>
            <p className="text-sm mt-2">
              <Link
                href="/dashboard/templates"
                className="underline text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Crea la primera desde el dashboard.
              </Link>
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
