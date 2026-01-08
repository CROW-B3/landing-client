'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatedBackground } from '@b3-crow/ui-kit'
import { Navigation } from '@/components/Navigation'
import { useQnAQuery, type Message, type Source } from '@/lib/api/qna'
import { motion, AnimatePresence } from 'framer-motion'
import { IoSend, IoArrowBack } from 'react-icons/io5'
import Link from 'next/link'

function LoadingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
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

function SourcesList({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null

  return (
    <div className="mt-3 pt-3 border-t border-white/10">
      <p className="text-xs text-white/40 mb-2">Sources:</p>
      <div className="flex flex-wrap gap-2">
        {sources.map((source, i) => (
          <a
            key={i}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded hover:bg-purple-500/30 transition-colors"
          >
            {source.title}
          </a>
        ))}
      </div>
    </div>
  )
}

function MessageBubble({
  message,
  sources,
}: {
  message: Message
  sources?: Source[]
}) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-purple-600/80 text-white'
            : 'bg-white/10 backdrop-blur-sm text-white/90 border border-white/10'
        }`}
      >
        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
        {!isUser && sources && <SourcesList sources={sources} />}
      </div>
    </motion.div>
  )
}

export default function AskPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [messages, setMessages] = useState<Message[]>([])
  const [sources, setSources] = useState<Map<number, Source[]>>(new Map())
  const [input, setInput] = useState('')
  const [hasSubmittedInitial, setHasSubmittedInitial] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { mutate, isPending } = useQnAQuery()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isPending])

  useEffect(() => {
    if (initialQuery && !hasSubmittedInitial) {
      setHasSubmittedInitial(true)
      handleSubmit(initialQuery)
    }
  }, [initialQuery, hasSubmittedInitial])

  const handleSubmit = (query?: string) => {
    const text = query || input.trim()
    if (!text || isPending) return

    const userMessage: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')

    mutate(
      { query: text, history: messages },
      {
        onSuccess: (data) => {
          const assistantMessage: Message = {
            role: 'assistant',
            content: data.response,
          }
          setMessages((prev) => [...prev, assistantMessage])
          setSources((prev) => new Map(prev).set(newMessages.length, data.sources))
        },
        onError: () => {
          const errorMessage: Message = {
            role: 'assistant',
            content: 'Sorry, something went wrong. Please try again.',
          }
          setMessages((prev) => [...prev, errorMessage])
        },
      }
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground variant="fullscreen" enableVerticalFade={true} fadeIntensity={0.9} />

      <div className="relative z-10 flex flex-col h-screen">
        <Navigation />

        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 pt-20 pb-4">
          <div className="mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
            >
              <IoArrowBack className="w-4 h-4" />
              Back to home
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pb-4">
            {messages.length === 0 && !isPending && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <h1 className="text-3xl font-bold text-white mb-2">Ask CROW</h1>
                <p className="text-white/60 max-w-md">
                  Ask anything about CROW, our documentation, or blog posts.
                </p>
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {messages.map((message, i) => (
                <MessageBubble
                  key={i}
                  message={message}
                  sources={message.role === 'assistant' ? sources.get(i - 1) : undefined}
                />
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

            <div ref={messagesEndRef} />
          </div>

          <div className="sticky bottom-0 pt-4 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
            <div className="flex gap-2 items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                disabled={isPending}
                className="flex-1 bg-transparent text-white placeholder-white/40 px-4 py-2 outline-none text-sm"
              />
              <button
                onClick={() => handleSubmit()}
                disabled={isPending || !input.trim()}
                className="p-3 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 disabled:cursor-not-allowed rounded-xl transition-colors"
              >
                <IoSend className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
