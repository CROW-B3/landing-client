import type { ChatMessage, Message } from '@/lib/api/qna'
import { AnimatedBackground } from '@b3-crow/ui-kit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { Send } from 'lucide-preact'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Navigation } from '@/components/Navigation'
import { getSession, useSendMessage } from '@/lib/api/qna'

const queryClient = new QueryClient()

interface SessionPageProps {
  sessionId: string
}

function LoadingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-purple-400 rounded-full"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${isUser
          ? 'bg-purple-600/80 text-white'
          : 'bg-white/10 backdrop-blur-sm text-white/90 border border-white/10'
        }`}
      >
        {isUser
          ? (
              <p className="whitespace-pre-wrap text-sm">{message.content}</p>
            )
          : (
              <div className="prose prose-invert max-w-none text-sm [&_p]:my-2 [&_li]:my-1 [&_code]:bg-white/10 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_pre]:bg-white/5 [&_pre]:p-3 [&_pre]:rounded">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            )}
      </div>
    </motion.div>
  )
}

function SessionPageContent({ sessionId }: SessionPageProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { mutate, isPending } = useSendMessage()

  const sendMessageToSession = (query: string) => {
    const userMessage: Message = { role: 'user', content: query }
    setMessages(prev => [...prev, userMessage])

    mutate(
      { sessionId, query },
      {
        onSuccess: (data) => {
          const assistantMessage: Message = {
            role: 'assistant',
            content: data.response,
          }
          setMessages(prev => [...prev, assistantMessage])
        },
        onError: () => {
          const errorMessage: Message = {
            role: 'assistant',
            content: 'Sorry, something went wrong. Please try again.',
          }
          setMessages(prev => [...prev, errorMessage])
        },
      },
    )
  }

  useEffect(() => {
    async function loadSession() {
      try {
        const session = await getSession(sessionId)
        const loadedMessages: Message[] = session.messages.map((m: ChatMessage) => ({
          role: m.role,
          content: m.content,
        }))
        setMessages(loadedMessages)
        setIsLoading(false)
      }
      catch {
        setError('Session not found')
        setIsLoading(false)
      }
    }
    loadSession()
  }, [sessionId])

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    if (!input.trim() || isPending)
      return

    sendMessageToSession(input)
    setInput('')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col relative">
        <AnimatedBackground
          variant="fullscreen"
          enableVerticalFade={true}
          fadeIntensity={0.9}
        />
        <div className="relative z-10 flex flex-col h-screen">
          <Navigation />
          <div className="flex-1 flex items-center justify-center">
            <LoadingDots />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col relative">
        <AnimatedBackground
          variant="fullscreen"
          enableVerticalFade={true}
          fadeIntensity={0.9}
        />
        <div className="relative z-10 flex flex-col h-screen">
          <Navigation />
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white/60">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground
        variant="fullscreen"
        enableVerticalFade={true}
        fadeIntensity={0.9}
      />

      <div className="relative z-10 flex flex-col h-screen">
        <Navigation />

        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 pt-20 pb-4">
          <div className="flex-1 overflow-y-auto space-y-4 pb-4">
            <AnimatePresence mode="popLayout">
              {messages.map((message, i) => (
                <MessageBubble key={i} message={message} />
              ))}
            </AnimatePresence>

            {isPending && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <LoadingDots />
                </div>
              </motion.div>
            )}
          </div>

          <div className="sticky bottom-0 pt-4 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex gap-2 items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput((e.target as HTMLInputElement).value)}
                placeholder="Ask a question..."
                disabled={isPending}
                className="flex-1 bg-transparent text-white placeholder-white/40 px-4 py-2 outline-none text-sm"
              />
              <button
                type="submit"
                disabled={isPending || !input.trim()}
                className="p-3 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 disabled:cursor-not-allowed rounded-xl transition-colors"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SessionPage(props: SessionPageProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionPageContent {...props} />
    </QueryClientProvider>
  )
}
