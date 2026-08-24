'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, FileText, Gavel, Home, LayoutDashboard, Menu, Users, CalendarDays, X } from 'lucide-react'
import { useState } from 'react'

const nav = [
  { href: '/app', label: 'Oversikt', icon: LayoutDashboard },
  { href: '/app/buyers', label: 'Kjøpere', icon: Users },
  { href: '/app/viewings', label: 'Visninger', icon: CalendarDays },
  { href: '/app/bids', label: 'Budrunde', icon: Gavel },
  { href: '/app/documents', label: 'Dokumenter', icon: FileText },
]
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); const [open, setOpen] = useState(false)
  return <div className="min-h-screen bg-secondary/50 text-foreground">
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-background p-6 transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between"><Link href="/" className="font-mono text-xl font-bold tracking-[-0.08em]">BOLIG<span className="text-primary">.</span></Link><button className="lg:hidden" aria-label="Lukk meny" onClick={() => setOpen(false)}><X className="size-5" /></button></div>
      <div className="mt-10 rounded-2xl bg-secondary p-4"><p className="eyebrow">Din bolig</p><p className="mt-2 font-medium">{property.address}</p><p className="text-sm text-muted-foreground">{property.city}</p></div>
      <nav className="mt-8 grid gap-1">{nav.map(({ href, label, icon: Icon }) => <Link onClick={() => setOpen(false)} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium ${pathname === href ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`} href={href} key={href}><Icon className="size-4" />{label}</Link>)}</nav>
      <div className="absolute bottom-6 left-6 right-6 border-t border-border pt-5"><Link href="/" className="flex items-center gap-3 text-sm text-muted-foreground"><Home className="size-4" />Til forsiden</Link></div>
    </aside>
    {open && <button aria-label="Lukk meny" className="fixed inset-0 z-30 bg-foreground/20 lg:hidden" onClick={() => setOpen(false)} />}
    <div className="lg:pl-64"><header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/90 px-5 backdrop-blur lg:px-10"><button className="flex size-11 items-center justify-center rounded-full border border-border lg:hidden" aria-label="Åpne meny" onClick={() => setOpen(true)}><Menu className="size-5" /></button><div className="hidden lg:block"><p className="text-sm font-medium">God morgen, Ida</p><p className="text-xs text-muted-foreground">Tirsdag 24. juni 2025</p></div><div className="flex items-center gap-3"><button className="flex size-11 items-center justify-center rounded-full border border-border" aria-label="Varsler"><Bell className="size-4" /></button><div className="flex size-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">IL</div></div></header><main className="mx-auto max-w-7xl px-5 py-8 pb-28 lg:px-10 lg:py-12">{children}</main></div>
    <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-background/95 px-2 py-2 backdrop-blur lg:hidden">{nav.slice(0, 4).map(({ href, label, icon: Icon }) => <Link className={`flex min-h-12 flex-1 flex-col items-center justify-center gap-1 text-[10px] ${pathname === href ? 'text-primary' : 'text-muted-foreground'}`} href={href} key={href}><Icon className="size-5" />{label}</Link>)}</nav>
  </div>
}
import { property } from '@/lib/bolig-data'

export function PageHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) { return <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">{eyebrow}</p><h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">{title}</h1>{copy && <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{copy}</p>}</div></div> }
