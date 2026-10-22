'use client'

import { useState, useTransition } from 'react'
import { updateLeadWorkflow, type Lead, type LeadStatus } from '@/app/actions/leads'

const statuses: { value: LeadStatus; label: string }[] = [
  { value: 'ny', label: 'Ny' }, { value: 'kontaktet', label: 'Kontaktet' }, { value: 'visning', label: 'Visning' }, { value: 'bud', label: 'Bud' }, { value: 'vunnet', label: 'Vunnet' }, { value: 'tapt', label: 'Tapt' },
]
export function LeadWorkflow({ lead }: { lead: Lead }) {
  const [status, setStatus] = useState<LeadStatus>(lead.status), [note, setNote] = useState(lead.note ?? ''), [saved, setSaved] = useState(false), [pending, startTransition] = useTransition()
  function save() { startTransition(async () => { await updateLeadWorkflow(lead.id, status, note); setSaved(true); window.setTimeout(() => setSaved(false), 2200) }) }
  return <div className="mt-4 rounded-2xl bg-secondary/60 p-3 sm:mt-0 sm:min-w-[310px] sm:max-w-[340px]">
    <div className="flex gap-2"><label className="sr-only" htmlFor={`status-${lead.id}`}>Status</label><select id={`status-${lead.id}`} value={status} onChange={(e) => setStatus(e.target.value as LeadStatus)} className="min-h-11 min-w-0 flex-1 rounded-xl border border-border bg-background px-3 text-sm"><option value="ny">Ny</option><option value="kontaktet">Kontaktet</option><option value="visning">Visning</option><option value="bud">Bud</option><option value="vunnet">Vunnet</option><option value="tapt">Tapt</option></select><button type="button" onClick={save} disabled={pending} className="min-h-11 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-60">{pending ? 'Lagrer' : saved ? 'Lagret' : 'Lagre'}</button></div>
    <label className="sr-only" htmlFor={`note-${lead.id}`}>Notat</label><textarea id={`note-${lead.id}`} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Skriv et notat til neste oppfølging" maxLength={1000} rows={2} className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm" />
  </div>
}
export function WorkflowLegend() { return <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">{statuses.map((item) => <span key={item.value} className="rounded-full border border-border px-2.5 py-1">{item.label}</span>)}</div> }
