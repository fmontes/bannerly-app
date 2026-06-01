import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/service";
import { getTemplateBySlugGlobal } from "@/lib/templates/get-template-by-slug-global";
import type { Template } from "@/lib/templates/types";

async function loadTemplate(slug: string): Promise<Template | null> {
  const supabase = createServiceClient();
  return getTemplateBySlugGlobal(supabase, slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const template = await loadTemplate(slug);
    if (template) return { title: `${template.name} — Bannerly` };
  } catch {
    // fall through to default title
  }
  return { title: "Plantilla — Bannerly" };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let template: Template | null = null;
  let errorMessage: string | null = null;

  try {
    template = await loadTemplate(slug);
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : "Error de conexión con Supabase";
  }

  if (!errorMessage && !template) notFound();

  return (
    <div className="min-h-screen bg-zinc-50 font-mono dark:bg-zinc-950">
      <main className="mx-auto max-w-2xl px-6 py-12">
        <Link
          href="/"
          className="inline-block text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          ← Volver
        </Link>

        {errorMessage ? (
          <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
            <p className="font-semibold">Error de conexión</p>
            <p className="mt-1 text-sm">{errorMessage}</p>
          </div>
        ) : (
          template && (
            <article className="mt-6 rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
              <div className="border-b border-zinc-200 p-5 dark:border-zinc-700">
                <h1 className="text-lg font-semibold text-red-600 dark:text-red-500">
                  {template.name}
                </h1>
              </div>

              <div className="space-y-4 p-5">
                <dl className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 text-zinc-500">Slug</dt>
                    <dd>
                      <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                        {template.slug}
                      </code>
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 text-zinc-500">Layout</dt>
                    <dd className="text-zinc-800 dark:text-zinc-200">
                      {template.layout_id}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 text-zinc-500">Dimensiones</dt>
                    <dd className="text-zinc-800 dark:text-zinc-200">
                      {template.width}&times;{template.height}
                    </dd>
                  </div>
                </dl>

                {template.layers && template.layers.length > 0 && (
                  <div>
                    <h2 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Capas
                    </h2>
                    <ul className="space-y-1">
                      {template.layers.map((layer, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 rounded border border-zinc-100 px-3 py-2 text-sm dark:border-zinc-800"
                        >
                          <span className="font-medium text-zinc-800 dark:text-zinc-200">
                            {layer.name}
                          </span>
                          <span className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-500 dark:bg-zinc-800">
                            {layer.type}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          )
        )}
      </main>
    </div>
  );
}
