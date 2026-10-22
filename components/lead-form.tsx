'use client'

import { useActionState } from 'react'
import { createLead } from '@/app/actions/leads'

const initialState = { ok: false, error: '' }
async function submit(_: typeof initialState, formData: FormData) {
  try { await createLead(formData); return { ok: true, error: '' } } catch { return { ok: false, error: 'Fyll ut navn og en gyldig e-postadresse.' } }
}

export function LeadForm({ address }: { address: string }) {
  const [state, action, pending] = useActionState(submit, initialState)
  if (state.ok) return <div className="rounded-2xl bg-accent p-5 text-sm text-accent-foreground"><p className="font-semibold">Takk — forespørselen er sendt.</p><p className="mt-1">Selger følger opp så snart som mulig.</p></div>
  return <form action={action} className="grid gap-3">
    <input type="hidden" name="propertyAddress" value={address} />
    <input name="name" required placeholder="Navn" className="min-h-12 rounded-xl border border-border px-4 text-base outline-none focus:ring-2 focus:ring-primary" />
    <input name="email" required type="email" placeholder="E-post" className="min-h-12 rounded-xl border border-border px-4 text-base outline-none focus:ring-2 focus:ring-primary" />
    <input name="phone" type="tel" placeholder="Telefon (valgfritt)" className="min-h-12 rounded-xl border border-border px-4 text-base outline-none focus:ring-2 focus:ring-primary" />
    <textarea name="message" placeholder="Jeg ønsker mer informasjon ..." rows={3} className="rounded-xl border border-border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-primary" />
    {state.error && <p className="text-sm text-destructive">{state.error}</p>}
    <button disabled={pending} className="min-h-12 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground disabled:opacity-60">{pending ? 'Sender ...' : 'Be om informasjon'}</button>
  </form>
}
