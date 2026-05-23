'use client'

import { logout } from '@/app/(auth)/actions'

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-sm text-neutral-500 hover:text-black dark:hover:text-white"
      >
        Salir
      </button>
    </form>
  )
}
