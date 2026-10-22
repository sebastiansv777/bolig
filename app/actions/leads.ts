'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { sql } from 'drizzle-orm'

export type Lead = {
  id: string
  name: string
  email: string
  phone: string | null
  message: string | null
  propertyAddress: string
  createdAt: string
  score: number
  priority: 'Høy' | 'Normal'
  nextAction: string
}

function scoreLead(lead: Pick<Lead, 'phone' | 'message' | 'email'>) {
  let score = 55
  if (lead.phone) score += 18
  if (lead.message && lead.message.length > 20) score += 12
  if (/visning|kjøpe|bud|finansiering|overtakelse/i.test(lead.message ?? '')) score += 12
  if (lead.email) score += 3
  return Math.min(score, 100)
}

export async function createLead(formData: FormData) {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const phone = String(formData.get('phone') || '').trim()
  const message = String(formData.get('message') || '').trim()
  const propertyAddress = String(formData.get('propertyAddress') || '').trim()
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || propertyAddress.length < 3) throw new Error('Sjekk navn, e-post og adresse')
  await db.execute(sql`insert into public.leads (property_address, name, email, phone, message) values (${propertyAddress}, ${name}, ${email}, ${phone || null}, ${message || null})`)
  revalidatePath('/app')
  revalidatePath('/app/buyers')
}

export async function getLeads(): Promise<Lead[]> {
  const result = await db.execute(sql`select id, property_address, name, email, phone, message, created_at from public.leads order by created_at desc limit 50`)
  return result.rows.map((row) => {
    const lead = { id: String(row.id), name: String(row.name), email: String(row.email), phone: row.phone ? String(row.phone) : null, message: row.message ? String(row.message) : null, propertyAddress: String(row.property_address), createdAt: new Date(String(row.created_at)).toLocaleDateString('nb-NO'), score: 0, priority: 'Normal' as const, nextAction: '' }
    const score = scoreLead(lead)
    return { ...lead, score, priority: score >= 78 ? 'Høy' : 'Normal', nextAction: score >= 78 ? 'Ring i dag' : 'Send personlig oppfølging' }
  })
}

export async function getLeadCount() {
  const result = await db.execute(sql`select count(*)::int as count from public.leads`)
  return Number(result.rows[0]?.count ?? 0)
}
