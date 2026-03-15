import { useMutation } from '@tanstack/react-query'
import ky from 'ky'

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

// eslint-disable-next-line node/prefer-global/process
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function sendQuery(request: QueryRequest): Promise<QueryResponse> {
  return ky.post(`${API_URL}/api/v1/qna/query`, {
    json: request,
    credentials: 'include',
  }).json()
}

export function useQnAQuery() {
  return useMutation({
    mutationFn: sendQuery,
  })
}

export type { Message, QueryRequest, QueryResponse }
