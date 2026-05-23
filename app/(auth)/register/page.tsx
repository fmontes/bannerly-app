'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { register } from '../actions'

const initialState = { error: undefined as string | undefined }

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const result = await register(formData)
      return result ?? initialState
    },
    initialState
  )

  return (
    <div className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h1 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Crear cuenta
      </h1>

      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            minLength={6}
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
          <p className="mt-1 text-xs text-zinc-400">Mínimo 6 caracteres</p>
        </div>

        {state?.error && (
          <p
            role="alert"
            className="rounded bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400"
          >
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded bg-zinc-900 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {pending ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="underline hover:text-zinc-800 dark:hover:text-zinc-200">
          Inicia sesión
        </Link>
      </p>
    </div>
  )
}
