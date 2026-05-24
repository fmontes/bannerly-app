import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { listTemplates } from '@/lib/templates/list-templates'
import { TemplateList } from '@/components/templates/template-list'
import { LogoutButton } from '@/components/auth/logout-button'

export default async function TemplatesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const templates = await listTemplates(supabase, user.id)

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Templates</h1>
          <span className="text-sm text-neutral-500">{user.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/templates/new"
            className="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            New template
          </Link>
          <LogoutButton />
        </div>
      </header>
      <TemplateList templates={templates} />
    </main>
  )
}
