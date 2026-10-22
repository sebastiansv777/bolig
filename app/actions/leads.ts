'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { sql } from 'drizzle-orm'

export async function createLead(formData: FormData) {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const phone = String(formData.get('phone') || '').trim()
  const message = String(formData.get('message') || '').trim()
  const propertyAddress = String(formData.get('propertyAddress') || '').trim()
  if (name.length < 2 || !email.includes('@') || propertyAddress.length < 3) throw new Error('Sjekk navn, e-post og adresse')
  await db.execute(sql`insert into public.leads (property_address, name, email, phone, message) values (${propertyAddress}, ${name}, ${email}, ${phone || null}, ${message || null})`)
  revalidatePath('/app')
  revalidatePath('/app/buyers')
}

export async function getLeadCount() {
  const result = await db.execute(sql`select count(*)::int as count from public.leads`)
  return Number(result.rows[0]?.count ?? 0)
}
