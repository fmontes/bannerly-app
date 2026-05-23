'use client'

import { useEffect, useState } from 'react'
import type { Template } from '@/lib/templates/types'

function TemplateModal({
  template,
  onClose,
}: {
  template: Template
  onClose: () => void
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={template.name}
    >
      <div
        className="relative w-full max-w-lg rounded-lg border border-zinc-700 bg-zinc-900 p-6 text-zinc-100 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute right-4 top-4 rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </button>

        <h2 className="mb-4 text-xl font-bold">{template.name}</h2>

        <dl className="space-y-2 text-sm">
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-zinc-400">Slug</dt>
            <dd>
              <code className="font-mono text-xs text-zinc-200">{template.slug}</code>
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-zinc-400">Layout</dt>
            <dd>
              <code className="font-mono text-xs text-zinc-200">{template.layout_id}</code>
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-zinc-400">Dimensiones</dt>
            <dd className="text-zinc-200">
              {template.width}&times;{template.height}
            </dd>
          </div>
        </dl>

        {template.layers.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Capas ({template.layers.length})
            </p>
            <ul className="space-y-1">
              {template.layers.map((layer) => (
                <li
                  key={layer.name}
                  className="flex items-center gap-2 rounded bg-zinc-800 px-3 py-1.5 text-sm"
                >
                  <span className="font-mono text-xs text-zinc-200">{layer.name}</span>
                  <span className="ml-auto rounded bg-zinc-700 px-1.5 py-0.5 text-xs text-zinc-400">
                    {layer.type}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export function TemplateGallery({ templates }: { templates: Template[] }) {
  const [selected, setSelected] = useState<Template | null>(null)

  if (templates.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8 text-center">
        <p className="text-zinc-400">Todavía no hay plantillas.</p>
        <a
          href="/dashboard/templates"
          className="mt-3 inline-block text-sm text-zinc-300 underline underline-offset-4 hover:text-white"
        >
          Crear tu primera plantilla
        </a>
      </div>
    )
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((tpl) => (
          <li key={tpl.id}>
            <button
              onClick={() => setSelected(tpl)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-left transition-colors hover:border-zinc-600 hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-zinc-400"
            >
              <p className="font-semibold text-zinc-100">{tpl.name}</p>
              <p className="mt-1 font-mono text-xs text-zinc-400">{tpl.slug}</p>
              <p className="mt-2 text-xs text-zinc-500">
                {tpl.width}&times;{tpl.height}
              </p>
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <TemplateModal template={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
