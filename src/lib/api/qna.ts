import { useMutation } from '@tanstack/react-query'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface QueryRequest {
  query: string
  history?: Message[]
}

interface QueryResponse {
  response: string
}

const API_URL = process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:8000'

async function sendQuery(request: QueryRequest): Promise<QueryResponse> {
  const res = await fetch(`${API_URL}/api/v1/qna/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(request),
  })

  if (!res.ok) {
    throw new Error('Query failed')
  }

  return res.json()
}

export function useQnAQuery() {
  return useMutation({
    mutationFn: sendQuery,
  })
}

export type { Message, QueryRequest, QueryResponse }
