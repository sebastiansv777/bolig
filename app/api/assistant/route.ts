import { gateway, streamText } from 'ai'
import { property } from '@/lib/bolig-data'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const prompt = typeof body.prompt === 'string' ? body.prompt.trim().slice(0, 1200) : ''
  if (!prompt) return Response.json({ error: 'Skriv et spørsmål først.' }, { status: 400 })

  const result = streamText({
    model: gateway('openai/o4-mini'),
    system: `Du er BOLIG Copilot, en norsk salgsassistent for eiendomsmeglere. Du skal være konkret, handlingsorientert og aldri finne på juridiske eller økonomiske fakta. Bolig: ${property.address}, ${property.price}, ${property.size}. Svar på norsk. Foreslå alltid ett tydelig neste steg og skill mellom fakta og anbefaling.`,
    prompt,
    temperature: 0.2,
  })
  return result.toTextStreamResponse()
}
