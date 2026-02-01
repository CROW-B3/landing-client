import { useMutation } from '@tanstack/react-query'
import ky from 'ky'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatMessage extends Message {
  id: string
  sessionId: string
  createdAt: string
}

export interface ChatSession {
  id: string
  title: string | null
  createdAt: string
  updatedAt: string
}

export interface SessionWithMessages extends ChatSession {
  messages: ChatMessage[]
}

interface SendMessageRequest {
  sessionId: string
  query: string
}

interface SendMessageResponse {
  userMessage: ChatMessage
  assistantMessage: ChatMessage
  response: string
}

const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000'

export async function createSession(title?: string): Promise<ChatSession> {
  return ky.post(`${API_URL}/api/v1/qna/sessions`, {
    json: title ? { title } : {},
    credentials: 'include',
  }).json()
}

export async function getSession(sessionId: string): Promise<SessionWithMessages> {
  return ky.get(`${API_URL}/api/v1/qna/sessions/${sessionId}`, {
    credentials: 'include',
  }).json()
}

export async function sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
  return ky.post(`${API_URL}/api/v1/qna/sessions/${request.sessionId}/messages`, {
    json: { query: request.query },
    credentials: 'include',
  }).json()
}

export function useSendMessage() {
  return useMutation({
    mutationFn: sendMessage,
  })
}

export function useCreateSession() {
  return useMutation({
    mutationFn: (title?: string) => createSession(title),
  })
}
