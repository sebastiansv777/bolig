import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthForm } from '@/components/auth-form'
import { auth } from '@/lib/auth'

export default async function SignInPage() { if ((await auth.api.getSession({ headers: await headers() }))?.user) redirect('/app'); return <main className="grid min-h-screen place-items-center bg-secondary/50 px-5 py-10"><section className="w-full max-w-md rounded-3xl border border-border bg-background p-6 shadow-sm sm:p-8"><Link href="/" className="font-mono text-xl font-bold tracking-[-0.08em]">BOLIG<span className="text-primary">.</span></Link><p className="eyebrow mt-12">Arbeidsflate for eiendom</p><h1 className="mt-3 text-4xl font-semibold tracking-[-0.06em]">Velkommen tilbake.</h1><p className="mt-3 mb-8 text-sm leading-6 text-muted-foreground">Logg inn for å håndtere boliger, interessenter og visninger.</p><AuthForm mode="sign-in" /></section></main> }
