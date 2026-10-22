import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ArrowRight, CheckCircle2, Clock3, Eye, Phone, TrendingUp } from 'lucide-react'
import { AppShell, PageHeader } from '@/components/app-shell'
import { AssistantPanel } from '@/components/assistant-panel'
import { LeadWorkflow } from '@/components/lead-workflow'
import { property } from '@/lib/bolig-data'
import { getLeadCount, getLeads } from '@/app/actions/leads'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')
  const [leadCount, leads] = await Promise.all([getLeadCount(), getLeads()])
  const highPriority = leads.filter((lead) => lead.priority === 'Høy').length
  return <AppShell>
    <PageHeader eyebrow="Arbeidsflate" title="Salget ditt, samlet." copy={`Neste riktige handlinger for ${property.address}.`} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Stat icon={TrendingUp} label="Estimert verdi" value={property.price} note="+3,2% siste måned" />
      <Stat icon={Eye} label="Annonsevisninger" value="1 248" note="+18% denne uken" />
      <Stat icon={Clock3} label="Interessenter" value={String(leadCount)} note={leadCount ? `${highPriority} bør følges opp i dag` : 'Ingen forespørsler ennå'} />
      <Stat icon={CheckCircle2} label="Annonsekvalitet" value="94 / 100" note="Klar for publisering" />
    </div>
    <div className="mt-8"><AssistantPanel /></div>
    <section className="mt-6 rounded-3xl border border-border bg-background p-5 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow">Prioritert innboks</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Dette bør du gjøre nå</h2></div><Link href="/app/buyers" className="text-sm font-medium text-primary">Åpne alle <ArrowRight className="ml-1 inline size-4" /></Link></div>
      {leads.length === 0 ? <div className="mt-6 rounded-2xl bg-secondary/60 p-5 text-sm text-muted-foreground">Når en kjøper tar kontakt, vurderer BOLIG signalene og foreslår neste handling her.</div> : <div className="mt-6 grid gap-3">{leads.slice(0, 4).map((lead) => <div key={lead.id} className="flex flex-col gap-4 rounded-2xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><div className="flex items-center gap-2"><p className="font-medium">{lead.name}</p><span className={`rounded-full px-2 py-1 text-[11px] font-medium ${lead.priority === 'Høy' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{lead.priority} · {lead.score}/100</span></div><p className="mt-1 truncate text-sm text-muted-foreground">{lead.message || 'Ønsker informasjon om boligen'}</p><p className="mt-2 text-xs text-muted-foreground">{lead.createdAt} · {lead.nextAction} · Status: {lead.status}</p><LeadWorkflow lead={lead} /><a href={`tel:${lead.phone ?? ''}`} className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-4 text-sm font-medium"><Phone className="mr-2 size-4" />Ring</a></div></div>)}</div>}
    </section>
    <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
      <section className="rounded-3xl border border-border bg-background p-6 sm:p-8"><div className="flex items-center justify-between"><div><p className="eyebrow">Salgsreise</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Neste steg i prosessen</h2></div><span className="font-mono text-sm text-primary">62%</span></div><div className="mt-6 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[62%] rounded-full bg-primary" /></div><div className="mt-8 grid gap-4 sm:grid-cols-2">{['Boligdata er bekreftet','Annonse er kvalitetssikret','Publiser annonsen','Planlegg første visning'].map((item, i) => <div className="flex items-start gap-3" key={item}><div className={`mt-0.5 flex size-6 items-center justify-center rounded-full ${i < 2 ? 'bg-accent text-accent-foreground' : 'border border-border text-muted-foreground'}`}>{i < 2 ? <CheckCircle2 className="size-4" /> : <span className="text-xs">{i + 1}</span>}</div><div><p className="text-sm font-medium">{item}</p><p className="mt-1 text-xs text-muted-foreground">{i < 2 ? 'Ferdig' : 'Neste steg'}</p></div></div>)}</div></section>
      <section className="rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8"><p className="eyebrow text-primary-foreground/70">BOLIG foreslår</p><h2 className="mt-3 text-2xl font-semibold">Følg opp mens interessen er varm.</h2><p className="mt-4 text-sm leading-6 text-primary-foreground/75">Personlige svar innen én time gir best sjanse for neste steg. Start med de prioriterte henvendelsene.</p><Link href="/app/buyers" className="mt-8 flex min-h-12 items-center justify-center rounded-full bg-background text-sm font-medium text-foreground">Se arbeidsliste <ArrowRight className="ml-2 size-4" /></Link></section>
    </div>
  </AppShell>
}
function Stat({ icon: Icon, label, value, note }: { icon: typeof TrendingUp; label: string; value: string; note: string }) { return <div className="rounded-2xl border border-border bg-background p-5"><Icon className="size-5 text-primary" /><p className="mt-8 text-xs text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p><p className="mt-2 text-xs text-primary">{note}</p></div> }
