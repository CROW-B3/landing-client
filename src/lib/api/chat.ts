/**
 * Client for the standalone CROW chat backend (Cloudflare Workers AI via
 * /api/chat). No external gateway — the landing worker hosts the model.
 */

export interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

/**
 * Ask CROW. Sends the recent conversation and returns the assistant's reply.
 * Throws on network / server error so callers can fall back gracefully.
 */
export async function askCrow(messages: ChatTurn[]): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ messages }),
  })
  if (!res.ok)
    throw new Error(`chat ${res.status}`)
  const data = (await res.json()) as { response?: string, error?: string }
  if (!data.response)
    throw new Error(data.error || 'empty response')
  return data.response
}
