'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { sql } from 'drizzle-orm'

export type LeadStatus = 'ny' | 'kontaktet' | 'visning' | 'bud' | 'vunnet' | 'tapt'
export type Lead = { id: string; name: string; email: string; phone: string | null; message: string | null; propertyAddress: string; createdAt: string; score: number; priority: 'Høy' | 'Normal'; nextAction: string; status: LeadStatus; note: string | null }

function scoreLead(lead: Pick<Lead, 'phone' | 'message' | 'email'>) { let score = 55; if (lead.phone) score += 18; if (lead.message && lead.message.length > 20) score += 12; if (/visning|kjøpe|bud|finansiering|overtakelse/i.test(lead.message ?? '')) score += 12; if (lead.email) score += 3; return Math.min(score, 100) }
async function userId() { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) throw new Error('Du må være logget inn'); return session.user.id }

export async function createLead(formData: FormData) {
  const name = String(formData.get('name') || '').trim(), email = String(formData.get('email') || '').trim().toLowerCase(), phone = String(formData.get('phone') || '').trim(), message = String(formData.get('message') || '').trim(), propertyAddress = String(formData.get('propertyAddress') || '').trim()
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || propertyAddress.length < 3) throw new Error('Sjekk navn, e-post og adresse')
  await db.execute(sql`insert into public.leads (property_address, name, email, phone, message) values (${propertyAddress}, ${name}, ${email}, ${phone || null}, ${message || null})`)
  revalidatePath('/app'); revalidatePath('/app/buyers')
}

export async function requestViewing(formData: FormData) {
  const name = String(formData.get('name') || '').trim(), email = String(formData.get('email') || '').trim().toLowerCase(), slot = String(formData.get('slot') || '').trim(), propertyAddress = String(formData.get('propertyAddress') || '').trim()
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !slot || propertyAddress.length < 3) throw new Error('Ugyldig forespørsel')
  await db.execute(sql`insert into public.leads (property_address, name, email, message) values (${propertyAddress}, ${name}, ${email}, ${`Visningsforespørsel: ${slot}`})`)
  revalidatePath('/app'); revalidatePath('/app/buyers')
}

export async function getLeads(): Promise<Lead[]> {
  const owner = await userId()
  const result = await db.execute(sql`select l.id, l.property_address, l.name, l.email, l.phone, l.message, l.created_at, coalesce(w.status, 'ny') as status, w.note from public.leads l left join public.lead_workflows w on w.lead_id = l.id::text and w.user_id = ${owner} order by l.created_at desc limit 50`)
  return result.rows.map((row) => { const lead = { id: String(row.id), name: String(row.name), email: String(row.email), phone: row.phone ? String(row.phone) : null, message: row.message ? String(row.message) : null, propertyAddress: String(row.property_address), createdAt: new Date(String(row.created_at)).toLocaleDateString('nb-NO'), score: 0, priority: 'Normal' as const, nextAction: '', status: String(row.status) as LeadStatus, note: row.note ? String(row.note) : null }; const score = scoreLead(lead); return { ...lead, score, priority: score >= 78 ? 'Høy' : 'Normal', nextAction: score >= 78 ? 'Ring i dag' : lead.status === 'ny' ? 'Send personlig oppfølging' : 'Følg opp neste steg' } })
}

export async function updateLeadWorkflow(leadId: string, status: LeadStatus, note: string) {
  const owner = await userId(); const safeNote = note.trim().slice(0, 1000)
  await db.execute(sql`insert into public.lead_workflows (id, lead_id, user_id, status, note, next_action) values (${crypto.randomUUID()}, ${leadId}, ${owner}, ${status}, ${safeNote || null}, ${status === 'ny' ? 'Send personlig oppfølging' : status === 'kontaktet' ? 'Avtal visning' : status === 'visning' ? 'Be om tilbakemelding' : status === 'bud' ? 'Følg budprosessen' : null}) on conflict (user_id, lead_id) do update set status = excluded.status, note = excluded.note, next_action = excluded.next_action, updated_at = now()`)
  await db.execute(sql`insert into public.audit_logs (id, user_id, entity_type, entity_id, action, details) values (${crypto.randomUUID()}, ${owner}, 'lead', ${leadId}, 'workflow_updated', ${JSON.stringify({ status, hasNote: Boolean(safeNote) })})`)
  revalidatePath('/app'); revalidatePath('/app/buyers')
}

export async function getLeadCount() { const owner = await userId(); const result = await db.execute(sql`select count(*)::int as count from public.leads`); void owner; return Number(result.rows[0]?.count ?? 0) }
