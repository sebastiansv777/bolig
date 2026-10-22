'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter(); const [error, setError] = useState(''); const [busy, setBusy] = useState(false)
  const isSignUp = mode === 'sign-up'
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setBusy(true)
    const data = new FormData(event.currentTarget)
    const result = isSignUp ? await authClient.signUp.email({ name: String(data.get('name')), email: String(data.get('email')), password: String(data.get('password')) }) : await authClient.signIn.email({ email: String(data.get('email')), password: String(data.get('password')) })
    setBusy(false)
    if (result.error) { setError('Kunne ikke logge inn med opplysningene. Sjekk feltene og prøv igjen.'); return }
    router.push('/app'); router.refresh()
  }
  return <form onSubmit={submit} className="grid gap-4">{isSignUp && <label className="grid gap-2 text-sm font-medium">Navn<input required name="name" autoComplete="name" className="min-h-12 rounded-xl border border-border bg-background px-4 text-base" /></label>}<label className="grid gap-2 text-sm font-medium">E-post<input required type="email" name="email" autoComplete="email" className="min-h-12 rounded-xl border border-border bg-background px-4 text-base" /></label><label className="grid gap-2 text-sm font-medium">Passord<input required minLength={8} type="password" name="password" autoComplete={isSignUp ? 'new-password' : 'current-password'} className="min-h-12 rounded-xl border border-border bg-background px-4 text-base" /></label>{error && <p role="alert" className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}<button disabled={busy} className="min-h-12 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground disabled:opacity-60">{busy ? 'Vent litt…' : isSignUp ? 'Opprett konto' : 'Logg inn'}</button><p className="text-center text-sm text-muted-foreground">{isSignUp ? 'Har du allerede konto?' : 'Mangler du konto?'} <Link className="font-medium text-primary underline-offset-4 hover:underline" href={isSignUp ? '/sign-in' : '/sign-up'}>{isSignUp ? 'Logg inn' : 'Opprett konto'}</Link></p></form>
}
