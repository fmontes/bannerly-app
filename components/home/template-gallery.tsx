import Link from "next/link";
import type { Template } from "@/lib/templates/types";

export function TemplateGallery({ templates }: { templates: Template[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <li key={template.id}>
          <Link
            href={`/templates/${template.slug}`}
            data-testid="template-card"
            className="block w-full rounded-lg border border-zinc-200 bg-white p-4 text-left transition hover:border-zinc-400 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500"
          >
            <p data-testid="template-card-name" className="font-medium text-zinc-900 dark:text-zinc-50">
              {template.name}
            </p>
            <p className="mt-1 font-mono text-xs text-zinc-500">
              {template.slug}
            </p>
            <p className="mt-2 text-xs text-zinc-400">
              {template.width}&times;{template.height}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
