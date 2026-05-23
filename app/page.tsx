import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

interface Template {
  id: string;
  name: string;
  slug: string;
  width: number;
  height: number;
}

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("templates")
    .select("id, name, slug, width, height")
    .limit(50);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-mono">
      {/* Hero */}
      <section className="px-8 py-20 text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          Bannerly
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
          Generación de imágenes dinámicas vía API. Diseña una plantilla una
          vez, renderiza miles de variantes a escala.
        </p>
        <Link
          href="/dashboard/templates"
          className="inline-block rounded border border-zinc-300 bg-white px-5 py-2 text-sm text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Ver mis plantillas →
        </Link>
      </section>

      {/* Gallery */}
      <section className="px-8 pb-20" aria-label="Galería de plantillas">
        <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-6">
          Plantillas disponibles
        </h2>

        {error ? (
          <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
            <p className="font-semibold">Error de conexión</p>
            <p className="mt-1 text-sm">{error.message}</p>
          </div>
        ) : !data || data.length === 0 ? (
          <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Todavía no hay plantillas.{" "}
              <Link
                href="/dashboard/templates"
                className="underline hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                Crea la primera
              </Link>
              .
            </p>
          </div>
        ) : (
          <ul
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            aria-label="Plantillas"
          >
            {(data as Template[]).map((tpl) => (
              <li
                key={tpl.id}
                className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                  {tpl.name}
                </p>
                <p className="text-xs text-zinc-400 mb-3 font-mono">
                  {tpl.slug}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {tpl.width} × {tpl.height}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
