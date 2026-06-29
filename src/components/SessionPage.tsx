import type { ChatTurn } from '@/lib/api/chat'
import { AnimatedBackground } from '@b3-crow/ui-kit'
import { AnimatePresence, motion } from 'framer-motion'
import { Send } from 'lucide-preact'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Navigation } from '@/components/Navigation'
import { askCrow } from '@/lib/api/chat'

interface Message { role: 'user' | 'assistant', content: string }

function LoadingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-purple-400 rounded-full"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
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
          ? <p className="whitespace-pre-wrap text-sm">{message.content}</p>
          : (
              <div className="prose prose-invert max-w-none text-sm [&_p]:my-2 [&_li]:my-1 [&_code]:bg-white/10 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_pre]:bg-white/5 [&_pre]:p-3 [&_pre]:rounded">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            )}
      </div>
    </motion.div>
  )
}

export function SessionPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isPending, setIsPending] = useState(false)
  const messagesRef = useRef<Message[]>([])
  const seededRef = useRef(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const send = (query: string) => {
    const q = query.trim()
    if (!q || isPending)
      return
    const history: Message[] = [...messagesRef.current, { role: 'user', content: q }]
    messagesRef.current = history
    setMessages(history)
    setIsPending(true)

    const turns: ChatTurn[] = history.map(m => ({ role: m.role, content: m.content }))
    askCrow(turns)
      .then((response) => {
        const next: Message[] = [...messagesRef.current, { role: 'assistant', content: response }]
        messagesRef.current = next
        setMessages(next)
      })
      .catch(() => {
        const next: Message[] = [...messagesRef.current, {
          role: 'assistant',
          content: 'Sorry — I couldn\'t reach my analysis engine just now. Give it another go in a moment.',
        }]
        messagesRef.current = next
        setMessages(next)
      })
      .finally(() => setIsPending(false))
  }

  // Seed the conversation from ?q= (set by the hero "Ask CROW" submit).
  useEffect(() => {
    if (seededRef.current)
      return
    seededRef.current = true
    const q = new URLSearchParams(window.location.search).get('q')
    if (q)
      send(q)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isPending])

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    send(input)
    setInput('')
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground variant="fullscreen" enableVerticalFade={true} fadeIntensity={0.9} />

      <div className="relative z-10 flex flex-col h-screen">
        <Navigation />

        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 pt-20 pb-4 min-h-0">
          <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pb-4">
            {messages.length === 0 && !isPending && (
              <div className="h-full flex items-center justify-center text-white/40 text-sm">
                Ask CROW anything about your shoppers.
              </div>
            )}
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
              onSubmit={handleSubmit}
              className="flex gap-2 items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2"
            >
              <input
                type="text"
                value={input}
                onInput={e => setInput((e.target as HTMLInputElement).value)}
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
