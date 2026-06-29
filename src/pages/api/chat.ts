import type { APIRoute } from 'astro'
import { SYSTEM_PROMPT } from '@/lib/personality'

export const prerender = false

// Cloudflare Workers AI model. llama-3.1-8b-instruct (non-fp8) was deprecated
// 2026-05-30; this FP8 8B variant is the current cheap/fast replacement.
// Swap to '@cf/meta/llama-3.3-70b-instruct-fp8-fast' for higher quality.
const MODEL = '@cf/meta/llama-3.1-8b-instruct-fp8'
const MAX_HISTORY = 12

interface ChatTurn { role: 'user' | 'assistant', content: string }
interface WorkersAI { run: (model: string, opts: unknown) => Promise<{ response?: string }> }

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

export const POST: APIRoute = async ({ request, locals }) => {
  let payload: { messages?: unknown }
  try {
    payload = await request.json()
  }
  catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const raw = Array.isArray(payload?.messages) ? payload.messages : []
  const history: ChatTurn[] = raw
    .filter((m): m is ChatTurn =>
      !!m && typeof (m as ChatTurn).content === 'string'
      && ((m as ChatTurn).role === 'user' || (m as ChatTurn).role === 'assistant'),
    )
    .slice(-MAX_HISTORY)
    .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }))

  if (history.length === 0)
    return json({ error: 'No messages provided' }, 400)

  const ai = (locals as { runtime?: { env?: { AI?: WorkersAI } } })?.runtime?.env?.AI
  if (!ai)
    return json({ error: 'AI binding unavailable' }, 503)

  try {
    const result = await ai.run(MODEL, {
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
      max_tokens: 512,
      temperature: 0.6,
    })
    const response = (result?.response ?? '').trim()
    if (!response)
      return json({ error: 'Empty response' }, 502)
    return json({ response })
  }
  catch {
    return json({ error: 'Inference failed' }, 502)
  }
}
