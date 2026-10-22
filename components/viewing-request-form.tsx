'use client'

import { useActionState } from 'react'
import { requestViewing } from '@/app/actions/leads'

const initialState = { ok: false, error: '' }
async function submit(_: typeof initialState, formData: FormData) {
  try { await requestViewing(formData); return { ok: true, error: '' } } catch { return { ok: false, error: 'Fyll ut navn, e-post og ønsket tidspunkt.' } }
}

export function ViewingRequestForm({ address }: { address: string }) {
  const [state, action, pending] = useActionState(submit, initialState)
  if (state.ok) return <div className="rounded-2xl bg-accent p-5 text-sm text-accent-foreground"><p className="font-semibold">Forespørselen er registrert.</p><p className="mt-1">Du får bekreftelse på e-post når selger har godkjent tidspunktet.</p></div>
  return <form action={action} className="grid gap-3"><input type="hidden" name="propertyAddress" value={address} /><input name="name" required placeholder="Navn" className="min-h-12 rounded-xl border border-border px-4 text-base outline-none focus:ring-2 focus:ring-primary" /><input name="email" required type="email" placeholder="E-post" className="min-h-12 rounded-xl border border-border px-4 text-base outline-none focus:ring-2 focus:ring-primary" /><select name="slot" required defaultValue="" className="min-h-12 rounded-xl border border-border bg-background px-4 text-base"><option value="" disabled>Velg ønsket tidspunkt</option><option>Lørdag 12:00–14:00</option><option>Søndag 14:00–16:00</option><option>Jeg ønsker privat visning</option></select>{state.error && <p className="text-sm text-destructive">{state.error}</p>}<button disabled={pending} className="min-h-12 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground disabled:opacity-60">{pending ? 'Registrerer ...' : 'Be om visning'}</button></form>
}
