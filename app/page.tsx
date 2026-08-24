'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Home,
  Image as ImageIcon,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Play,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'

const photos = [
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85',
]

const features = [
  { icon: ScanLine, title: 'Boligdata', copy: 'Start med adressen. Få oversikt over boligen og salgsprosessen.' },
  { icon: FileText, title: 'Boligannonse', copy: 'Bygg en profesjonell annonse på minutter.' },
  { icon: BarChart3, title: 'Markedsanalyse', copy: 'Se hvordan lignende boliger prises og presenteres.' },
  { icon: MessageCircle, title: 'Kjøperdialog', copy: 'Hold orden på interessenter og henvendelser.' },
  { icon: Home, title: 'Visning', copy: 'Planlegg og organiser visninger.' },
  { icon: Users, title: 'Budrunde', copy: 'Følg budene i én samlet prosess.' },
  { icon: ShieldCheck, title: 'Kontrakt & oppgjør', copy: 'Fullfør salget med profesjonelle løsninger.' },
]

const journey = ['Adresse', 'Boligdata', 'Presentasjon', 'Annonse', 'Publisering', 'Visninger', 'Budrunde', 'Oppgjør']

export default function Page() {
  const [price, setPrice] = useState(5500000)
  const [addressOpen, setAddressOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [aiCopy, setAiCopy] = useState('Lys og gjennomført leilighet med en rolig beliggenhet nær sentrum. Her får du tre gode soverom, moderne kjøkken og en solrik balkong.')
  const saving = Math.round(price * 0.021 - 14990)
  const formattedPrice = new Intl.NumberFormat('nb-NO').format(price)
  const formattedSaving = new Intl.NumberFormat('nb-NO').format(Math.max(saving, 0))
  const quality = useMemo(() => aiCopy.length > 150 ? 94 : 88, [aiCopy])

  function improveCopy(type: string) {
    const copies: Record<string, string> = {
      'Forbedre teksten': 'Lys og gjennomført leilighet med en rolig beliggenhet nær sentrum. Nyt tre gode soverom, moderne kjøkken og en solrik balkong med utsikt over grønne omgivelser.',
      'Kortere': 'Lys leilighet med tre soverom, moderne kjøkken og solrik balkong – rolig, sentralt og klar for nye eiere.',
      'Mer eksklusiv': 'Arkitekttegnet kvalitet møter nordisk ro i denne gjennomførte leiligheten. En sjelden kombinasjon av materialer, lys og beliggenhet.',
    }
    setAiCopy(copies[type] ?? copies['Forbedre teksten'])
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:h-20 lg:px-8">
          <a href="#top" className="font-mono text-xl font-bold tracking-[-0.08em]">BOLIG<span className="text-primary">.</span></a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex">
            <a href="#how" className="transition-colors hover:text-foreground">Slik fungerer det</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Priser</a>
            <a href="#product" className="transition-colors hover:text-foreground">Boligverktøy</a>
            <a href="#guides" className="transition-colors hover:text-foreground">Guider</a>
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            <button className="text-sm text-muted-foreground hover:text-foreground">Logg inn</button>
            <button onClick={() => setAddressOpen(true)} className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]">Start salget <ArrowRight className="ml-2 inline size-4" /></button>
          </div>
          <button aria-label="Åpne meny" onClick={() => setMenuOpen(!menuOpen)} className="flex size-11 items-center justify-center rounded-full border border-border lg:hidden">{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
        {menuOpen && <div className="border-t border-border bg-background px-5 py-5 lg:hidden"><nav className="grid gap-4 text-lg"><a href="#how" onClick={() => setMenuOpen(false)}>Slik fungerer det</a><a href="#pricing" onClick={() => setMenuOpen(false)}>Priser</a><a href="#product" onClick={() => setMenuOpen(false)}>Boligverktøy</a><button onClick={() => setAddressOpen(true)} className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-primary text-primary-foreground">Start salget <ArrowRight className="ml-2 size-4" /></button></nav></div>}
      </header>

      <section id="top" className="relative px-5 pb-20 pt-32 lg:px-8 lg:pb-32 lg:pt-44">
        <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
          <div className="relative z-10">
            <p className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary"><span className="size-2 rounded-full bg-primary" /> Fremtidens boligsalg</p>
            <h1 className="max-w-3xl text-balance text-[clamp(3.6rem,9vw,8rem)] font-semibold leading-[0.88] tracking-[-0.075em]">Selg boligen selv.<br /><span className="text-primary">Bare smartere.</span></h1>
            <p className="mt-8 max-w-lg text-pretty text-lg leading-7 text-muted-foreground">Profesjonell teknologi for hele boligsalget – fra første vurdering til ferdig oppgjør.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><button onClick={() => setAddressOpen(true)} className="min-h-14 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground transition-transform hover:scale-[1.02]">Start med adressen din <ArrowRight className="ml-2 inline size-4" /></button><a href="#calculator" className="flex min-h-14 items-center justify-center rounded-full border border-border px-7 text-base font-medium transition-colors hover:bg-secondary">Se hvor mye du kan spare</a></div>
            <p className="mt-4 text-xs text-muted-foreground">Gratis å starte · Du beholder kontrollen hele veien</p>
          </div>
          <div className="relative min-h-[430px] overflow-visible sm:min-h-[540px]">
            <img src={photos[0]} alt="Lys skandinavisk stue" className="absolute inset-0 h-full w-full rounded-[2rem] object-cover" />
            <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-white/50 bg-background/95 p-5 shadow-2xl backdrop-blur-md sm:-left-10 sm:right-12 sm:p-6">
              <div className="flex items-start justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Din bolig</p><p className="mt-2 text-lg font-medium">Eksempelgata 12</p><p className="text-sm text-muted-foreground">4020 Stavanger</p></div><span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">På god vei</span></div>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-4"><div><p className="text-[10px] uppercase text-muted-foreground">Estimert verdi</p><p className="mt-1 text-sm font-semibold">5 490 000 kr</p></div><div><p className="text-[10px] uppercase text-muted-foreground">Annonse</p><p className="mt-1 text-sm font-semibold text-primary">94 / 100</p></div><div><p className="text-[10px] uppercase text-muted-foreground">Interessenter</p><p className="mt-1 text-sm font-semibold">12</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="border-y border-border bg-secondary px-5 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-2 lg:gap-24"><div><p className="eyebrow">Regnestykket</p><h2 className="section-title mt-4">Hvor mye vil du<br /><span className="text-primary">beholde selv?</span></h2><p className="mt-6 max-w-md leading-6 text-muted-foreground">Et boligsalg trenger ikke koste en stor del av boligen. Se hva du kan spare med BOLIG.</p></div><div className="rounded-3xl bg-background p-6 shadow-sm sm:p-8"><div className="flex items-center justify-between"><label htmlFor="price" className="text-sm font-medium">Forventet salgspris</label><span className="font-mono text-xl font-semibold">{formattedPrice} kr</span></div><input id="price" type="range" min="2500000" max="15000000" step="100000" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="mt-8 w-full accent-primary" /><div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>2,5M</span><span>15M</span></div><div className="mt-8 divide-y divide-border border-y border-border"><div className="flex justify-between py-4 text-sm"><span className="text-muted-foreground">Tradisjonell megler <span className="ml-1 text-xs">~2,1%</span></span><span>{new Intl.NumberFormat('nb-NO').format(Math.round(price * .021))} kr</span></div><div className="flex justify-between py-4 text-sm"><span className="text-muted-foreground">BOLIG Complete</span><span>24 990 kr</span></div><div className="flex items-end justify-between py-5"><span className="font-medium">Din mulige besparelse</span><span className="text-3xl font-semibold tracking-tight text-primary">{formattedSaving} kr</span></div></div><button onClick={() => setAddressOpen(true)} className="mt-6 min-h-12 w-full rounded-full bg-primary font-medium text-primary-foreground">Start med adressen din <ArrowRight className="ml-2 inline size-4" /></button></div></div></div></section>

      <section id="product" className="px-5 py-20 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-xl"><p className="eyebrow">Ett system</p><h2 className="section-title mt-4">Alt du trenger.<br /><span className="text-primary">På ett sted.</span></h2></div><div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{features.map((feature, i) => { const Icon = feature.icon; return <div key={feature.title} className={`group bg-background p-6 transition-colors hover:bg-secondary ${i === 0 ? 'lg:col-span-2' : ''}`}><div className="flex items-start justify-between"><Icon className="size-5 text-primary" /><span className="font-mono text-xs text-muted-foreground">0{i + 1}</span></div><h3 className="mt-16 text-lg font-medium">{feature.title}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{feature.copy}</p><ChevronRight className="mt-7 size-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" /></div> })}</div></div></section>

      <section className="bg-primary px-5 py-20 text-primary-foreground lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-2 lg:items-center"><div><p className="eyebrow text-primary-foreground/60">Boligannonse</p><h2 className="section-title mt-4">Skal se ut som den kostet <span className="text-accent">50 000 kr.</span></h2><p className="mt-6 max-w-md leading-6 text-primary-foreground/70">Bygg en profesjonell boligannonse uten å være megler. Du bestemmer – vi gjør det enkelt å få det riktig.</p><div className="mt-8 flex flex-wrap gap-2">{['Forbedre teksten', 'Kortere', 'Mer eksklusiv'].map((label) => <button key={label} onClick={() => improveCopy(label)} className="min-h-11 rounded-full border border-primary-foreground/20 px-4 text-sm transition-colors hover:bg-primary-foreground/10"><Sparkles className="mr-2 inline size-3.5" />{label}</button>)}</div></div><div className="overflow-hidden rounded-3xl bg-background text-foreground shadow-2xl"><div className="flex items-center justify-between border-b border-border px-5 py-4"><div className="flex items-center gap-2 text-sm font-medium"><LayoutDashboard className="size-4 text-primary" /> Boligannonse</div><span className="rounded-full bg-accent px-3 py-1 text-xs font-medium">{quality} / 100</span></div><div className="grid md:grid-cols-2"><div className="border-b border-border p-5 md:border-b-0 md:border-r"><div className="flex items-center justify-between"><span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Rediger innhold</span><span className="text-xs text-primary">AI klar</span></div><label className="mt-6 block text-xs text-muted-foreground">Tittel</label><input defaultValue="Lys leilighet med utsikt" className="mt-2 min-h-11 w-full border-b border-border bg-transparent text-sm outline-none focus:border-primary" /><label className="mt-6 block text-xs text-muted-foreground">Beskrivelse</label><textarea value={aiCopy} onChange={(e) => setAiCopy(e.target.value)} className="mt-2 min-h-32 w-full resize-none rounded-xl bg-secondary p-3 text-sm leading-6 outline-none focus:ring-2 focus:ring-primary/20" /></div><div className="p-5"><div className="relative aspect-[4/3] overflow-hidden rounded-2xl"><img src={photos[1]} alt="Interiør i boligannonse" className="h-full w-full object-cover" /><span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs">Forsidebilde</span></div><p className="mt-5 text-xl font-medium">Lys leilighet med utsikt</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{aiCopy}</p><div className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground"><span className="rounded-full bg-secondary px-3 py-1">72 m²</span><span className="rounded-full bg-secondary px-3 py-1">3 soverom</span><span className="rounded-full bg-secondary px-3 py-1">2021</span></div></div></div></div></div></div></section>

      <section id="how" className="px-5 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">Slik fungerer det</p><h2 className="section-title mt-4">Du har kontroll.<br /><span className="text-primary">Vi har systemet.</span></h2></div><button onClick={() => setAddressOpen(true)} className="flex min-h-12 items-center gap-2 text-sm font-medium text-primary">Se hele reisen <ArrowRight className="size-4" /></button></div><div className="mt-14 grid gap-8 md:grid-cols-3"><div className="border-t-2 border-primary pt-5"><span className="font-mono text-sm text-primary">01</span><h3 className="mt-8 text-xl font-medium">Start med adressen</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Vi henter inn grunnlaget og gir deg en tydelig vei videre.</p></div><div className="border-t border-border pt-5"><span className="font-mono text-sm text-muted-foreground">02</span><h3 className="mt-8 text-xl font-medium">Bygg salget</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Lag annonsen, organiser bilder og få markedet på din side.</p></div><div className="border-t border-border pt-5"><span className="font-mono text-sm text-muted-foreground">03</span><h3 className="mt-8 text-xl font-medium">Selg</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Håndter dialog, visninger og budrunde i én trygg prosess.</p></div></div><div className="mt-16 overflow-x-auto pb-3"><div className="flex min-w-[720px] items-center justify-between gap-2">{journey.map((item, i) => <div key={item} className="flex items-center gap-2"><div className={`flex size-10 items-center justify-center rounded-full border text-xs font-medium ${i === 0 ? 'border-primary bg-primary text-primary-foreground' : 'border-border'}`}>{String(i + 1).padStart(2, '0')}</div><span className="text-xs text-muted-foreground">{item}</span>{i < journey.length - 1 && <div className="mx-2 h-px w-8 bg-border lg:w-12" />}</div>)}</div></div></div></section>

      <section id="pricing" className="bg-secondary px-5 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">Priser</p><h2 className="section-title mt-4">Velg hvor mye<br /><span className="text-primary">du vil gjøre selv.</span></h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground">Ingen provisjon. Ingen bindingstid. Bare en tydelig pris for jobben du trenger.</p></div><div className="mt-12 grid gap-4 lg:grid-cols-3">{[{name:'START', price:'4 990', copy:'For deg som vil gjøre mest selv.', items:['Digital boligannonse','AI-assistent','Kvalitetsscore','Boligdashboard','Kjøperhåndtering']},{name:'PRO', price:'14 990', copy:'For deg som vil ha støtte på veien.', items:['Alt i Start','Profesjonell annonsehjelp','Fotokoordinering','Dokumentflyt','Markedsføringsstøtte'], popular:true},{name:'COMPLETE', price:'24 990', copy:'Alt samlet i én profesjonell prosess.', items:['Profesjonell fotografering','Dokumentasjon','Visning og kjøperdialog','Kontraktflyt','Oppgjørsflyt']}].map((plan) => <div key={plan.name} className={`relative rounded-3xl border p-6 sm:p-8 ${plan.popular ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background'}`}>{plan.popular && <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">Mest valgt</span>}<p className={`font-mono text-xs tracking-widest ${plan.popular ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{plan.name}</p><p className="mt-8 text-4xl font-semibold tracking-tight">{plan.price} <span className={`text-sm font-normal ${plan.popular ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>kr</span></p><p className={`mt-3 text-sm ${plan.popular ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{plan.copy}</p><ul className="mt-8 space-y-4 border-t border-current/10 pt-6">{plan.items.map(item => <li key={item} className="flex gap-3 text-sm"><Check className="size-4 shrink-0 text-accent" />{item}</li>)}</ul><button onClick={() => setAddressOpen(true)} className={`mt-9 min-h-12 w-full rounded-full text-sm font-medium ${plan.popular ? 'bg-background text-foreground' : 'bg-primary text-primary-foreground'}`}>Velg {plan.name.toLowerCase()} <ArrowRight className="ml-2 inline size-4" /></button></div>)}</div></div></section>

      <section id="guides" className="px-5 py-20 lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center"><div className="relative h-[420px] overflow-hidden rounded-3xl"><img src={photos[2]} alt="Nordisk boligfasade i kveldssol" className="h-full w-full object-cover" /><div className="absolute bottom-5 left-5 rounded-2xl bg-background/90 p-5 backdrop-blur"><p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">BOLIG / Innsikt</p><p className="mt-2 text-lg font-medium">Slik selger du bolig selv</p><p className="mt-1 text-sm text-muted-foreground">En komplett guide for deg som vurderer å selge.</p></div></div><div><p className="eyebrow">Kunnskap du kan bruke</p><h2 className="section-title mt-4">Gjør ditt<br /><span className="text-primary">beste salg.</span></h2><p className="mt-6 max-w-md leading-6 text-muted-foreground">Fra verdivurdering og boligannonse til budrunde og oppgjør. Vi forklarer det viktigste, uten vanskelige ord.</p><div className="mt-8 divide-y divide-border border-y border-border">{['Selge bolig selv – komplett guide','Hva koster det å selge bolig?','Slik lager du en boligannonse som selger'].map((guide) => <a href="#top" key={guide} className="flex min-h-16 items-center justify-between text-sm font-medium transition-colors hover:text-primary">{guide}<ChevronRight className="size-4 text-muted-foreground" /></a>)}</div></div></div></section>

      <footer className="border-t border-border bg-primary px-5 py-12 text-primary-foreground lg:px-8 lg:py-16"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-10 md:flex-row"><div><a href="#top" className="font-mono text-2xl font-bold tracking-[-0.08em]">BOLIG<span className="text-accent">.</span></a><p className="mt-5 max-w-xs text-sm leading-6 text-primary-foreground/60">Boligsalg, gjort riktig. Profesjonell teknologi for deg som vil selge selv.</p></div><div className="grid grid-cols-2 gap-x-14 gap-y-8 text-sm sm:grid-cols-3"><div><p className="mb-4 text-xs uppercase tracking-widest text-primary-foreground/40">Produkt</p><a className="block py-1 text-primary-foreground/70 hover:text-primary-foreground" href="#product">Boligverktøy</a><a className="block py-1 text-primary-foreground/70 hover:text-primary-foreground" href="#pricing">Priser</a><a className="block py-1 text-primary-foreground/70 hover:text-primary-foreground" href="#how">Slik fungerer det</a></div><div><p className="mb-4 text-xs uppercase tracking-widest text-primary-foreground/40">Guider</p><a className="block py-1 text-primary-foreground/70 hover:text-primary-foreground" href="#guides">Selge bolig selv</a><a className="block py-1 text-primary-foreground/70 hover:text-primary-foreground" href="#calculator">Boligverdi</a></div><div><p className="mb-4 text-xs uppercase tracking-widest text-primary-foreground/40">Selskapet</p><a className="block py-1 text-primary-foreground/70 hover:text-primary-foreground" href="mailto:hei@bolig.no">Kontakt</a><a className="block py-1 text-primary-foreground/70 hover:text-primary-foreground" href="#top">Om oss</a></div></div></div><div className="mt-14 flex flex-col justify-between gap-3 border-t border-primary-foreground/10 pt-5 text-xs text-primary-foreground/40 sm:flex-row"><span>© 2026 BOLIG AS</span><span>Personvern · Vilkår</span></div></div></footer>

      {addressOpen && <div role="dialog" aria-modal="true" aria-labelledby="address-title" className="fixed inset-0 z-50 flex items-end justify-center bg-primary/40 p-0 backdrop-blur-sm sm:items-center sm:p-5"><div className="w-full max-w-xl rounded-t-3xl bg-background p-6 shadow-2xl sm:rounded-3xl sm:p-10"><div className="flex justify-between"><div><p className="eyebrow">01 / 08 · Bolig</p><h2 id="address-title" className="mt-4 text-3xl font-semibold tracking-tight">Hvilken bolig skal du selge?</h2></div><button aria-label="Lukk" onClick={() => setAddressOpen(false)} className="flex size-11 items-center justify-center rounded-full border border-border"><X className="size-5" /></button></div><p className="mt-4 text-muted-foreground">Begynn med adressen, så gjør vi resten oversiktlig.</p><div className="mt-8 flex min-h-14 items-center rounded-xl border border-primary bg-secondary px-4"><Home className="mr-3 size-5 text-primary" /><input autoFocus placeholder="Begynn å skrive adressen..." className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground" /></div><div className="mt-6 rounded-2xl border border-border p-5"><p className="text-sm font-medium">Eksempelgata 12</p><p className="mt-1 text-sm text-muted-foreground">4020 Stavanger</p><div className="mt-5 grid grid-cols-3 gap-3 text-xs text-muted-foreground"><span>72 m²</span><span>3 soverom</span><span>Leilighet · 2021</span></div></div><div className="mt-8 flex items-center justify-between"><span className="text-xs text-muted-foreground">Gratis å starte</span><button onClick={() => setAddressOpen(false)} className="min-h-12 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">Fortsett <ArrowRight className="ml-2 inline size-4" /></button></div></div></div>}
    </main>
  )
}

