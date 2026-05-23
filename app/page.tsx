import { createClient } from "@/lib/supabase/server";
import { TemplateGallery } from "@/components/templates/template-gallery";
import type { Template } from "@/lib/templates/types";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .order("created_at", { ascending: false });

  const templates: Template[] = data ?? [];

  return (
    <main className="min-h-screen bg-zinc-950 font-mono text-zinc-100">
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Bannerly
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          Generación de imágenes dinámicas vía API. Diseña una plantilla una
          vez, renderiza miles de variantes a escala.
        </p>
        <a
          href="/dashboard/templates"
          className="mt-8 inline-block rounded-lg border border-zinc-600 bg-zinc-800 px-6 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700"
        >
          Ver mis plantillas
        </a>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="mb-6 text-lg font-semibold text-zinc-200">
          Plantillas disponibles
        </h2>

        {error ? (
          <div className="rounded-lg border border-red-800 bg-red-950 p-4 text-red-400">
            <p className="font-semibold">Error de conexión</p>
            <p className="mt-1 text-sm">{error.message}</p>
          </div>
        ) : (
          <TemplateGallery templates={templates} />
        )}
      </section>
    </main>
  );
}
