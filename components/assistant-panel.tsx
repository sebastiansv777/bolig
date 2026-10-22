'use client'

import { useState } from 'react'
import { Bot, Loader2, Send, Sparkles } from 'lucide-react'

const suggestions = ['Hvem bør jeg følge opp først?', 'Skriv et svar til en interessent', 'Hva bør gjøres før visning?']

export function AssistantPanel() {
  const [prompt, setPrompt] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  async function ask(value = prompt) {
    const question = value.trim()
    if (!question || loading) return
    setPrompt(question)
    setAnswer('')
    setLoading(true)
    try {
      const response = await fetch('/api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: question }) })
      if (!response.ok || !response.body) throw new Error('Kunne ikke hente svar')
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value: chunk } = await reader.read()
        if (done) break
        setAnswer((current) => current + decoder.decode(chunk, { stream: true }))
      }
    } catch {
      setAnswer('Jeg fikk ikke kontakt med assistenten akkurat nå. Prøv igjen, eller åpne arbeidslisten for en trygg manuell neste handling.')
    } finally { setLoading(false) }
  }

  return <section className="rounded-3xl border border-border bg-foreground p-5 text-background sm:p-7" aria-label="BOLIG Copilot">
    <div className="flex items-start gap-3"><div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-background/10"><Bot className="size-5" /></div><div><p className="eyebrow text-background/60">BOLIG Copilot</p><h2 className="mt-1 text-xl font-semibold tracking-tight">Få hjelp til neste riktige handling</h2></div></div>
    <div className="mt-5 flex flex-wrap gap-2">{suggestions.map((item) => <button key={item} type="button" onClick={() => ask(item)} className="min-h-10 rounded-full border border-background/15 px-3 text-left text-xs text-background/75 transition hover:bg-background/10">{item}</button>)}</div>
    {answer && <div className="mt-5 whitespace-pre-wrap rounded-2xl bg-background/10 p-4 text-sm leading-6 text-background/90">{answer}</div>}
    <form className="mt-5 flex gap-2" onSubmit={(event) => { event.preventDefault(); void ask() }}><label className="sr-only" htmlFor="assistant-prompt">Spør BOLIG Copilot</label><input id="assistant-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Spør om en kunde, visning eller salgsoppgave" className="min-w-0 flex-1 rounded-full border border-background/15 bg-background/10 px-4 text-base text-background outline-none placeholder:text-background/45 focus:border-background/40" /><button className="flex size-11 shrink-0 items-center justify-center rounded-full bg-background text-foreground" disabled={loading} aria-label="Send spørsmål">{loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}</button></form><p className="mt-3 flex items-center gap-1.5 text-[11px] text-background/45"><Sparkles className="size-3" /> Assistenten bruker boligdata og arbeidslisten din som kontekst.</p>
  </section>
}
