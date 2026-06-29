import { Globe } from '@b3-crow/ui-kit'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { askCrow } from '@/lib/api/chat'

/*
 * Mobile-only landing redesign, ported from the Claude Design handoff
 * ("CROW Mobile"). Self-contained: the "Ask CROW" flow opens an in-page
 * slide-in chat with client-side canned answers — no backend / API gateway.
 * Rendered under lg only; the desktop layout is untouched (see HomePage).
 */

type Role = 'user' | 'assistant'
interface Msg { role: Role, content: string, streaming?: boolean }

// Feature lists mirror auth-client/src/config/plans.tsx (the pricing source of
// truth): 1M interactions + 1M patterns included, then the module capabilities.
const FEAT_WEB = ['1,000,000 interactions / month', '1,000,000 patterns / month', 'SDK tracking', 'Funnels & drop-off', 'Session evidence', 'Event API']
const FEAT_CCTV = ['1,000,000 interactions / month', '1,000,000 patterns / month', 'Sites & camera groups', 'Agent ingest', 'Footfall & queues', 'Heatmaps']
const FEAT_SOCIAL = ['1,000,000 interactions / month', '1,000,000 patterns / month', 'Keyword tracking', 'Sentiment & spikes', 'Source selection', 'Regional filters']

function answerFor(q: string): string {
  const s = (q || '').toLowerCase()
  if (/spike|surge|increase|jump|drop|fell|decline|yesterday/.test(s))
    return 'I looked across all three channels for that window.\n\n• In-store (CCTV): footfall rose 18% vs. the prior week, concentrated 5–7pm.\n• Web: sessions up 9%, but pricing-page bounce climbed too.\n• Social: a positive mention from a mid-size account drove the referral lift.\n\nThe spike is mostly evening foot traffic converting to site visits. Want me to break it down by store?'
  if (/compare|store|location|branch|\bvs\b/.test(s))
    return 'Comparing your top locations over the last 30 days:\n\n• Store A — 12,400 interactions, 3.1% conversion, dwell 4m20s.\n• Store B — 9,850 interactions, 4.0% conversion, dwell 5m10s.\n• Store C — 7,200 interactions, 2.4% conversion.\n\nStore B converts best despite lower traffic — longer dwell near the feature display. I\'d replicate that layout in Store C.'
  if (/cctv|camera|footfall|heatmap|in.?store|physical/.test(s))
    return 'CROW turns each camera stream into a clean interaction model: footfall, dwell time, queue length, and zone heatmaps — no manual tagging.\n\nRight now your busiest zone is the entrance display (28% of dwell) and the quietest is the back aisle. Want a heatmap for a specific store?'
  if (/funnel|conversion|bounce|session|rage|replay|web\b|website/.test(s))
    return 'On the web side I model the full journey — sessions, rage clicks, funnels, and replays.\n\nYour checkout funnel drops 41% at the shipping step, mostly on mobile. Two rage-click clusters point at the promo-code field. Fixing that alone could recover ~6% of carts.'
  if (/social|sentiment|brand|mention|feedback|review/.test(s))
    return 'Social sentiment over the last 7 days is 72% positive, 19% neutral, 9% negative.\n\nPositive mentions cluster around the new packaging; the negatives are about delivery times in two regions. I can set a live keyword alert if you\'d like.'
  if (/price|cost|plan|pricing|how much|subscribe|included|cctv plan|web plan|social plan/.test(s))
    return 'CROW has three focused plans:\n\n• CCTV — $29/mo, physical-space analytics.\n• Web — $49/mo, full journey modeling (most popular).\n• Social — $39/mo, sentiment & feedback.\n\nAll include 1,000,000 interactions and patterns per month. Annual billing saves 20%.'
  if (/api|endpoint|sdk|library|libraries|docs|documentation|integrat|auth|token|security/.test(s))
    return 'Getting started is quick:\n\n1. Create an API key in the dashboard.\n2. POST events to /v1/interactions, or pull rollups from /v1/summaries.\n3. Drop in an SDK — Node.js, Python, and Go are available.\n\nAuth is a bearer token over HTTPS, scoped per project. Want a sample request?'
  if (/what (?:is|are)|who are you|explain|about|do you do|capab/.test(s))
    return 'I\'m CROW — Cognitive Reasoning Observation Watcher.\n\nI unify website analytics, in-store CCTV insight, and social feedback into one model, so you can see real shopper behaviour across every channel and just ask questions in plain language.\n\nTry: "Why did foot traffic spike yesterday?"'
  return 'Good question. I pull from your web analytics, in-store CCTV, and social signals to answer that as one picture.\n\nRight now engagement is trending up week-over-week, led by evening in-store traffic that\'s also showing up as site visits. Want me to dig into a specific channel, store, or time range?'
}

export function MobileLanding() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const [menuOpen, setMenuOpen] = useState(false)
  const [screen, setScreen] = useState<'landing' | 'chat'>('landing')
  const [heroInput, setHeroInput] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([])
  const [thinking, setThinking] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)

  const chatScrollRef = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const typerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const monthly = billing === 'monthly'
  // Flat per-module price from the auth source of truth ($60/mo, $50/mo billed
  // annually). Always a /mo figure — annual just lowers the monthly rate.
  const period = 'mo'
  const price = monthly ? 60 : 50
  const priceCctv = price
  const priceWeb = price
  const priceSocial = price

  const scrollChat = useCallback(() => {
    requestAnimationFrame(() => {
      const el = chatScrollRef.current
      if (el)
        el.scrollTop = el.scrollHeight + 600
    })
  }, [])

  const streamIn = useCallback((text: string) => {
    if (typerRef.current)
      clearInterval(typerRef.current)
    setThinking(false)
    setMessages(m => m.concat([{ role: 'assistant', content: '', streaming: true }]))
    scrollChat()
    let i = 0
    const step = Math.max(2, Math.round(text.length / 90))
    typerRef.current = setInterval(() => {
      i += step
      const done = i >= text.length
      const shown = done ? text : text.slice(0, i)
      setMessages((m) => {
        const out = m.slice()
        const last = out.length - 1
        const lastMsg = out[last]
        if (lastMsg && lastMsg.role === 'assistant')
          out[last] = { role: 'assistant', content: shown, streaming: !done }
        return out
      })
      scrollChat()
      if (done && typerRef.current) {
        clearInterval(typerRef.current)
        typerRef.current = null
      }
    }, 16)
  }, [scrollChat])

  // Ask the live model (Workers AI via /api/chat); fall back to the built-in
  // canned answer if the backend is unreachable, so a demo never dead-ends.
  const respond = useCallback(async (history: Msg[]) => {
    const lastUser = history.filter(m => m.role === 'user').pop()?.content ?? ''
    try {
      const text = await askCrow(history.map(m => ({ role: m.role, content: m.content })))
      streamIn(text)
    }
    catch {
      streamIn(answerFor(lastUser))
    }
  }, [streamIn])

  const openChat = useCallback((q: string) => {
    if (!q || !q.trim())
      return
    const query = q.trim()
    setMenuOpen(false)
    setHeroInput('')
    setScreen('chat')
    const next: Msg[] = [{ role: 'user', content: query }]
    setMessages(next)
    setThinking(true)
    scrollChat()
    respond(next)
  }, [respond, scrollChat])

  const submitHero = useCallback((e: Event) => {
    e.preventDefault()
    openChat(heroInput)
  }, [openChat, heroInput])

  const submitChat = useCallback((e: Event) => {
    e.preventDefault()
    const q = chatInput.trim()
    if (!q || thinking || typerRef.current)
      return
    const next = messages.concat([{ role: 'user', content: q }])
    setMessages(next)
    setChatInput('')
    setThinking(true)
    scrollChat()
    respond(next)
  }, [chatInput, thinking, messages, respond, scrollChat])

  const go = useCallback((id: string) => {
    setMenuOpen(false)
    requestAnimationFrame(() => {
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      const el = document.getElementById(id)
      if (el)
        window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 8), behavior: 'smooth' })
    })
  }, [])

  // nav frost on scroll
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // reveal-on-scroll + staggered feature cards + counters
  useEffect(() => {
    const root = rootRef.current
    if (!root)
      return
    if (reduceMotion || !('IntersectionObserver' in window)) {
      root.querySelectorAll<HTMLElement>('[data-card]').forEach((c) => {
        c.style.opacity = '1'
        c.style.transform = 'none'
      })
      root.querySelectorAll<HTMLElement>('[data-counter]').forEach(runCounter)
      return
    }
    const observers: IntersectionObserver[] = []

    const revealIO = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.animation = 'crowm-revealUp .8s cubic-bezier(.2,.8,.2,1) both'
          revealIO.unobserve(e.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })
    root.querySelectorAll('[data-reveal]').forEach(el => revealIO.observe(el))
    observers.push(revealIO)

    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-card]'))
    cards.forEach((c, i) => c.setAttribute('data-card-i', String(i)))
    const cardIO = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          const i = Number.parseInt(el.getAttribute('data-card-i') || '0', 10)
          el.style.transformOrigin = '50% 100%'
          el.style.animation = `crowm-cardIn .9s cubic-bezier(.22,1,.32,1) ${i * 0.13}s both`
          el.addEventListener('animationend', (ev) => {
            if ((ev as AnimationEvent).animationName === 'crowm-cardIn') {
              el.style.animation = 'none'
              el.style.opacity = '1'
              el.style.transform = 'none'
              el.style.transformOrigin = 'center'
            }
          }, { once: true })
          window.setTimeout(() => el.classList.add('swept'), i * 130 + 240)
          cardIO.unobserve(el)
        }
      })
    }, { threshold: 0.18 })
    cards.forEach(c => cardIO.observe(c))
    observers.push(cardIO)

    const countIO = new IntersectionObserver((es) => {
      es.forEach((e) => {
        const el = e.target as HTMLElement
        if (e.isIntersecting && !el.getAttribute('data-done')) {
          el.setAttribute('data-done', '1')
          runCounter(el)
          countIO.unobserve(el)
        }
      })
    }, { threshold: 0.5 })
    root.querySelectorAll('[data-counter]').forEach(el => countIO.observe(el))
    observers.push(countIO)

    return () => observers.forEach(o => o.disconnect())
  }, [reduceMotion])

  useEffect(() => () => {
    if (typerRef.current)
      clearInterval(typerRef.current)
  }, [])

  const chips = [
    { q: 'Why did foot traffic spike yesterday?', label: 'Why did foot traffic spike?' },
    { q: 'Compare my top stores', label: 'Compare my stores' },
    { q: 'Where\'s my web funnel dropping off?', label: 'Funnel drop-off' },
  ]
  const features: { title: string, desc: string, q: string, img?: string, imgStyle?: string, svg?: preact.JSX.Element }[] = [
    {
      title: 'Interaction',
      desc: 'Web, in-store (CCTV), and social signals merged into one clean, queryable interaction model.',
      q: 'Show me how CROW\'s interaction model works.',
      svg: (
        <svg width="132" height="92" viewBox="0 0 132 92" fill="none" stroke="rgba(255,255,255,.82)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:.72;filter:drop-shadow(0 0 10px rgba(168,85,247,.35))">
          <circle cx="16" cy="18" r="7" />
          <circle cx="16" cy="46" r="7" />
          <circle cx="16" cy="74" r="7" />
          <path d="M23 18 H62 a12 12 0 0 1 12 12 V38" />
          <path d="M23 46 H74" />
          <path d="M23 74 H62 a12 12 0 0 0 12 -12 V54" />
          <circle cx="82" cy="46" r="11" />
          <path d="M93 46 H122" />
          <circle cx="122" cy="46" r="4.5" fill="rgba(205,170,255,.6)" stroke="none" />
        </svg>
      ),
    },
    { img: '/api.webp', title: 'API', desc: 'Endpoints for interactions and summaries, ready to plug into any dashboard or automation.', q: 'How do I get started with the CROW API?', imgStyle: 'max-width:72%;max-height:74%;object-fit:contain;filter:invert(1) brightness(1.5);opacity:.72' },
    { img: '/chat.webp', title: 'Chat', desc: 'An AI analyst that explains behaviour, spots spikes, compares stores, and answers product questions clearly.', q: 'What can the CROW chat analyst do for me?', imgStyle: 'max-width:72%;max-height:70%;object-fit:contain;filter:invert(1) brightness(1.5);opacity:.72' },
  ]
  const segOn = 'border:none;cursor:pointer;font-size:13px;font-weight:600;padding:8px 16px;border-radius:980px;font-family:\'Sora\',sans-serif;color:#fff;background:linear-gradient(155deg,var(--accent,#A855F7),#7C3AED);box-shadow:0 4px 12px rgba(124,58,237,.4)'
  const segOff = 'border:none;cursor:pointer;font-size:13px;font-weight:600;padding:8px 16px;border-radius:980px;font-family:\'Sora\',sans-serif;color:rgba(255,255,255,.6);background:transparent'

  const checkIcon = (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent,#A855F7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:none">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )

  return (
    <div ref={rootRef} class="crowm" data-rm={reduceMotion ? '1' : '0'} style="position:relative;width:100%;min-height:100vh;overflow-x:hidden;background:radial-gradient(120% 80% at 50% -6%, #0e0a16 0%, #08080b 52%, #050506 100%);color:#fff">

      {/* aurora background */}
      <div aria-hidden="true" style="position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none">
        <div class="amb" style="position:absolute;inset:-25%;background:radial-gradient(540px 470px at 20% 14%,rgba(124,58,237,.16),transparent 55%),radial-gradient(580px 500px at 84% 26%,rgba(168,85,247,.12),transparent 55%),radial-gradient(460px 410px at 50% 94%,rgba(76,29,149,.17),transparent 58%);filter:blur(38px);animation:crowm-auroraShift 19s ease-in-out infinite alternate"></div>
        <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px);background-size:42px 42px;-webkit-mask-image:radial-gradient(circle at 50% 18%, #000 0%, transparent 70%);mask-image:radial-gradient(circle at 50% 18%, #000 0%, transparent 70%)"></div>
      </div>

      <div style="position:relative;z-index:1">

        {/* floating pill nav */}
        <div style="position:fixed;top:12px;left:0;right:0;z-index:40;display:flex;justify-content:center;padding:0 14px;pointer-events:none">
          <div style={`pointer-events:auto;display:flex;align-items:center;backdrop-filter:saturate(180%) blur(22px);-webkit-backdrop-filter:saturate(180%) blur(22px);border-radius:980px;padding:6px 6px 6px 15px;box-shadow:0 12px 40px rgba(0,0,0,.4);transition:background .3s,border-color .3s;border:1px solid ${navScrolled ? 'rgba(255,255,255,.14)' : 'rgba(255,255,255,.09)'};background:${navScrolled ? 'rgba(8,8,11,.9)' : 'rgba(18,18,20,.72)'}`}>
            <button type="button" onClick={() => go('top')} style="display:flex;align-items:center;gap:8px;background:none;border:none;cursor:pointer;padding:2px 0">
              <img src="/favicon.webp" alt="CROW" width="22" height="22" style="width:22px;height:22px;object-fit:contain;filter:drop-shadow(0 0 7px rgba(168,85,247,.5))" />
              <span style="font-weight:800;font-size:16px;letter-spacing:.04em;color:#fff">CROW</span>
            </button>
            <div style="width:1px;height:18px;background:rgba(255,255,255,.14);margin:0 11px"></div>
            <button type="button" class="tapsc" onClick={() => openChat('What is CROW and what can it do?')} style="font-size:13px;font-weight:600;color:#000;background:#fff;border:none;border-radius:980px;padding:8px 14px;cursor:pointer">Try</button>
            <button type="button" class="tapsc" onClick={() => setMenuOpen(true)} aria-label="Menu" style="width:38px;height:38px;margin-left:4px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.06);border:none;border-radius:50%;color:#fff;cursor:pointer">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            </button>
          </div>
        </div>

        {/* HERO */}
        <section id="top" style="position:relative;min-height:100svh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:84px 24px 40px">
          <div class="amb" style="position:absolute;top:132px;left:50%;transform:translateX(-50%);width:270px;height:270px;border-radius:50%;background:radial-gradient(circle,rgba(168,85,247,.2),transparent 66%);filter:blur(24px);pointer-events:none;animation:crowm-glowPulse 4.5s ease-in-out infinite"></div>

          <img src="/favicon.webp" alt="CROW" width="74" height="74" style="position:relative;width:74px;height:74px;object-fit:contain;filter:drop-shadow(0 6px 24px rgba(168,85,247,.6));opacity:0;animation:crowm-revealUp .8s cubic-bezier(.2,.8,.2,1) .05s both" />

          <h1 aria-label="CROW" style="position:relative;display:flex;justify-content:center;margin:16px 0 0;font-weight:800;font-size:78px;line-height:1;letter-spacing:-.05em">
            {['C', 'R', 'O', 'W'].map((ch, i) => (
              <span key={ch} style="display:inline-block;overflow:hidden;padding:0 .012em"><span style={`display:inline-block;transform:translateY(112%);opacity:0;animation:crowm-charRise 1s cubic-bezier(.2,.8,.2,1) ${0.12 + i * 0.1}s forwards;background:linear-gradient(180deg,#fff 18%,#CDAAFF 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent`}>{ch}</span></span>
            ))}
          </h1>

          <p style="position:relative;margin:18px auto 0;max-width:312px;font-size:14.5px;line-height:1.55;color:rgba(255,255,255,.62);opacity:0;animation:crowm-revealUp .8s cubic-bezier(.2,.8,.2,1) .5s both">Web, in-store, and social signals — unified into one model you can simply ask.</p>

          <form onSubmit={submitHero} style="position:relative;margin-top:26px;width:100%;max-width:330px;display:flex;align-items:center;gap:8px;padding:8px 8px 8px 18px;border-radius:980px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.13);box-shadow:0 10px 34px rgba(0,0,0,.4);opacity:0;animation:crowm-revealUp .8s cubic-bezier(.2,.8,.2,1) .62s both">
            <input type="text" value={heroInput} onInput={e => setHeroInput((e.target as HTMLInputElement).value)} placeholder="Ask CROW anything..." autocomplete="off" enterkeyhint="send" style="flex:1;min-width:0;background:transparent;border:none;outline:none;color:#fff;font-family:'Sora',sans-serif;font-size:15px" />
            <button type="submit" class="tapsc" aria-label="Ask" style="flex:none;width:42px;height:42px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;background:linear-gradient(155deg, var(--accent,#A855F7), #7C3AED);box-shadow:0 6px 18px rgba(124,58,237,.5)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </form>

          <div style="position:relative;margin-top:14px;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:330px;opacity:0;animation:crowm-revealUp .8s cubic-bezier(.2,.8,.2,1) .72s both">
            {chips.map(c => (
              <button key={c.q} type="button" onClick={() => openChat(c.q)} style="font-size:12.5px;color:rgba(255,255,255,.72);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:980px;padding:7px 13px;cursor:pointer">{c.label}</button>
            ))}
          </div>

          <div class="amb" style="position:absolute;bottom:16px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.5);animation:crowm-bob 1.8s ease-in-out infinite">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
        </section>

        {/* MARQUEE */}
        <div style="position:relative;padding:8px 0;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)">
          <div class="amb" style="display:inline-flex;white-space:nowrap;animation:crowm-marquee 24s linear infinite;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.18em;color:rgba(255,255,255,.34)">
            {[0, 1].map(rep => (
              <span key={rep} style="display:inline-flex">
                <span style="padding:0 18px">FOOTFALL ANALYTICS</span>
                <span style="color:var(--accent,#A855F7)">·</span>
                <span style="padding:0 18px">SENTIMENT AI</span>
                <span style="color:var(--accent,#A855F7)">·</span>
                <span style="padding:0 18px">FUNNEL OPTIMIZATION</span>
                <span style="color:var(--accent,#A855F7)">·</span>
                <span style="padding:0 18px">HEATMAPS</span>
                <span style="color:var(--accent,#A855F7)">·</span>
                <span style="padding:0 18px">SESSION REPLAY</span>
                <span style="color:var(--accent,#A855F7)">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" data-reveal style="position:relative;padding:56px 22px 48px">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.28em;color:rgba(255,255,255,.4)">[ ABOUT ]</div>
          <div style="position:relative;display:flex;justify-content:center;margin:24px 0 28px">
            <div style="position:relative;width:236px;height:236px;display:flex;align-items:center;justify-content:center">
              <div class="amb" style="position:absolute;inset:-16%;background:radial-gradient(circle at 50% 45%,rgba(168,85,247,.4),transparent 62%);filter:blur(14px);animation:crowm-glowB 11s ease-in-out infinite"></div>
              <div style="position:absolute;width:202px;height:202px;border-radius:50%;border:1px solid rgba(168,85,247,.18)"></div>
              <div style="position:relative;width:232px;height:232px;display:flex;align-items:center;justify-content:center">
                <Globe size={232} />
              </div>
            </div>
          </div>
          <div style="position:relative;padding-left:18px">
            <div style="position:absolute;left:0;top:4px;bottom:4px;width:2px;border-radius:2px;background:linear-gradient(180deg,rgba(205,170,255,.85),rgba(168,85,247,.35),transparent)"></div>
            <h2 style="margin:0;font-size:48px;font-weight:800;letter-spacing:-.04em;line-height:1;background:linear-gradient(180deg,#fff 30%,#9b8bbf 120%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent">CROW</h2>
            <p style="margin:6px 0 0;font-size:12.5px;color:rgba(255,255,255,.4)">(Cognitive Reasoning Observation Watcher)</p>
            <p style="margin:18px 0 0;font-size:18px;line-height:1.5;color:#CDAAFF;font-weight:400">Unifies website analytics, CCTV insights, and social feedback into one model — showing real shopper behaviour across every channel.</p>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:30px">
            <div style="text-align:center;padding:16px 6px;border:1px solid rgba(255,255,255,.08);border-radius:16px;background:rgba(255,255,255,.025)">
              <div data-counter="3" style="font-family:'JetBrains Mono',monospace;font-size:26px;font-weight:600;color:#fff">0</div>
              <div style="font-size:10.5px;color:rgba(255,255,255,.5);margin-top:4px;line-height:1.3">
                Channels
                <br />
                unified
              </div>
            </div>
            <div style="text-align:center;padding:16px 6px;border:1px solid rgba(168,85,247,.22);border-radius:16px;background:rgba(168,85,247,.07)">
              <div data-counter="1000000" style="font-family:'JetBrains Mono',monospace;font-size:26px;font-weight:600;color:#fff">0</div>
              <div style="font-size:10.5px;color:rgba(255,255,255,.5);margin-top:4px;line-height:1.3">
                Interactions
                <br />
                / month
              </div>
            </div>
            <div style="text-align:center;padding:16px 6px;border:1px solid rgba(255,255,255,.08);border-radius:16px;background:rgba(255,255,255,.025)">
              <div data-counter="99.9" data-dec="1" data-suffix="%" style="font-family:'JetBrains Mono',monospace;font-size:26px;font-weight:600;color:#fff">0</div>
              <div style="font-size:10.5px;color:rgba(255,255,255,.5);margin-top:4px;line-height:1.3">
                Pipeline
                <br />
                uptime
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" data-reveal style="position:relative;padding:56px 22px">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.28em;color:rgba(255,255,255,.4)">[ FEATURES ]</div>
          <h2 style="margin:10px 0 22px;font-size:32px;font-weight:800;letter-spacing:-.035em;color:#fff;line-height:1.05">
            One model.
            <br />
            Every signal.
          </h2>
          <div style="display:flex;flex-direction:column;gap:16px">
            {features.map(f => (
              <div key={f.title} class="spot" data-card style="opacity:0;border:1px solid rgba(255,255,255,.09);border-radius:22px;background:rgba(255,255,255,.035);padding:22px;backdrop-filter:blur(6px)">
                <div style="height:118px;border-radius:14px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.02);display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;z-index:1">
                  {f.svg || <img src={f.img} alt="" style={f.imgStyle} />}
                </div>
                <h3 style="margin:18px 0 0;font-size:21px;font-weight:600;color:#fff;position:relative;z-index:1">{f.title}</h3>
                <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:#CDAAFF;position:relative;z-index:1">{f.desc}</p>
                <button type="button" class="tapsc" onClick={() => openChat(f.q)} style="margin-top:16px;position:relative;z-index:1;font-size:13.5px;font-weight:500;color:#fff;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.5);border-radius:980px;padding:10px 18px;cursor:pointer">Try Now</button>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" data-reveal style="position:relative;padding:56px 22px">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.28em;color:rgba(255,255,255,.4)">[ PLANS ]</div>
          <h2 style="margin:10px 0 18px;font-size:32px;font-weight:800;letter-spacing:-.035em;color:#fff;line-height:1.05">
            Pick a channel.
            <br />
            Start watching.
          </h2>
          <div style="display:flex;align-items:center;gap:10px;margin:0 0 22px">
            <div style="display:flex;padding:4px;border-radius:980px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09)">
              <button type="button" onClick={() => setBilling('monthly')} style={monthly ? segOn : segOff}>Monthly</button>
              <button type="button" onClick={() => setBilling('yearly')} style={!monthly ? segOn : segOff}>Yearly</button>
            </div>
            {!monthly && (
              <span style="font-size:11px;font-weight:600;color:#CDAAFF;background:rgba(168,85,247,.18);border:1px solid rgba(168,85,247,.3);padding:5px 10px;border-radius:980px;animation:crowm-revealUp .3s ease-out both">Save 17%</span>
            )}
          </div>

          <div style="display:flex;flex-direction:column;gap:16px">
            {/* WEB */}
            <div class="spot" style="position:relative;border:1px solid rgba(255,255,255,.09);border-radius:22px;background:rgba(255,255,255,.035);padding:22px">
              <div style="display:flex;align-items:center;gap:12px;position:relative;z-index:1">
                <div style="width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);color:#D8C2FF">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
                  </svg>
                </div>
                <div>
                  <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.2em;color:rgba(255,255,255,.4)">DIGITAL</div>
                  <div style="font-size:20px;font-weight:600;color:#fff;margin-top:2px">Web</div>
                </div>
              </div>
              <p style="margin:14px 0 0;font-size:13.5px;line-height:1.45;color:rgba(255,255,255,.55);position:relative;z-index:1">Digital journey + interaction capture.</p>
              <div style="display:flex;align-items:flex-end;gap:4px;margin-top:16px;position:relative;z-index:1">
                <span style="font-family:'JetBrains Mono',monospace;font-size:38px;font-weight:600;color:#fff;line-height:1">
                  $
                  {priceWeb}
                </span>
                <span style="font-size:14px;color:rgba(255,255,255,.45);margin-bottom:6px">
                  /
                  {period}
                </span>
              </div>
              <div style="height:1px;background:rgba(255,255,255,.08);margin:18px 0;position:relative;z-index:1"></div>
              <div style="display:flex;flex-direction:column;gap:9px;position:relative;z-index:1">
                {FEAT_WEB.map(f => (
                  <div key={f} style="display:flex;align-items:center;gap:10px;font-size:13.5px;color:rgba(255,255,255,.82)">
                    {checkIcon}
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <button type="button" class="tapsc" onClick={() => openChat('Tell me about the CROW Web plan.')} style="margin-top:20px;position:relative;z-index:1;width:100%;font-size:14px;font-weight:600;color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.2);border-radius:980px;padding:13px;cursor:pointer">Get started</button>
            </div>

            {/* CCTV — most popular (badge lives in a non-clipping wrapper so the
                card's overflow:hidden shimmer doesn't cut it off) */}
            <div style="position:relative;margin-top:4px">
              <span style="position:absolute;top:-11px;left:50%;transform:translateX(-50%);font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;letter-spacing:.16em;color:#fff;background:linear-gradient(155deg,var(--accent,#A855F7),#7C3AED);padding:5px 12px;border-radius:980px;white-space:nowrap;box-shadow:0 6px 16px rgba(124,58,237,.45);z-index:5">MOST POPULAR</span>
              <div class="spot shine" style="position:relative;border:1px solid var(--accent,#A855F7);border-radius:22px;background:linear-gradient(180deg,rgba(168,85,247,.13),rgba(255,255,255,.03));padding:22px;box-shadow:0 0 40px rgba(168,85,247,.22)">
                <div style="display:flex;align-items:center;gap:12px;position:relative;z-index:1">
                  <div style="width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:rgba(168,85,247,.18);border:1px solid rgba(168,85,247,.32);color:#E7D8FF">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m22 8-6 4 6 4V8Z" />
                      <rect x="2" y="6" width="14" height="12" rx="2" />
                    </svg>
                  </div>
                  <div>
                    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.2em;color:#CDAAFF">OBSERVATION</div>
                    <div style="font-size:20px;font-weight:600;color:#fff;margin-top:2px">CCTV</div>
                  </div>
                </div>
                <p style="margin:14px 0 0;font-size:13.5px;line-height:1.45;color:rgba(255,255,255,.62);position:relative;z-index:1">Physical behavior + camera signals.</p>
                <div style="display:flex;align-items:flex-end;gap:4px;margin-top:16px;position:relative;z-index:1">
                  <span style="font-family:'JetBrains Mono',monospace;font-size:38px;font-weight:600;color:#fff;line-height:1">
                    $
                    {priceCctv}
                  </span>
                  <span style="font-size:14px;color:rgba(255,255,255,.5);margin-bottom:6px">
                    /
                    {period}
                  </span>
                </div>
                <div style="height:1px;background:rgba(255,255,255,.1);margin:18px 0;position:relative;z-index:1"></div>
                <div style="display:flex;flex-direction:column;gap:9px;position:relative;z-index:1">
                  {FEAT_CCTV.map(f => (
                    <div key={f} style="display:flex;align-items:center;gap:10px;font-size:13.5px;color:#fff">
                      {checkIcon}
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button type="button" class="tapsc" onClick={() => openChat('What\'s included in the CROW CCTV plan?')} style="margin-top:20px;position:relative;z-index:4;width:100%;font-size:14px;font-weight:600;color:#fff;background:linear-gradient(155deg,var(--accent,#A855F7),#7C3AED);border:none;border-radius:980px;padding:14px;cursor:pointer;box-shadow:0 8px 22px rgba(124,58,237,.45)">Get started</button>
              </div>
            </div>

            {/* SOCIAL */}
            <div class="spot" style="position:relative;border:1px solid rgba(255,255,255,.09);border-radius:22px;background:rgba(255,255,255,.035);padding:22px">
              <div style="display:flex;align-items:center;gap:12px;position:relative;z-index:1">
                <div style="width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);color:#D8C2FF">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                </div>
                <div>
                  <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.2em;color:rgba(255,255,255,.4)">SENTIMENT</div>
                  <div style="font-size:20px;font-weight:600;color:#fff;margin-top:2px">Social</div>
                </div>
              </div>
              <p style="margin:14px 0 0;font-size:13.5px;line-height:1.45;color:rgba(255,255,255,.55);position:relative;z-index:1">Brand sentiment and feedback aggregation.</p>
              <div style="display:flex;align-items:flex-end;gap:4px;margin-top:16px;position:relative;z-index:1">
                <span style="font-family:'JetBrains Mono',monospace;font-size:38px;font-weight:600;color:#fff;line-height:1">
                  $
                  {priceSocial}
                </span>
                <span style="font-size:14px;color:rgba(255,255,255,.45);margin-bottom:6px">
                  /
                  {period}
                </span>
              </div>
              <div style="height:1px;background:rgba(255,255,255,.08);margin:18px 0;position:relative;z-index:1"></div>
              <div style="display:flex;flex-direction:column;gap:9px;position:relative;z-index:1">
                {FEAT_SOCIAL.map(f => (
                  <div key={f} style="display:flex;align-items:center;gap:10px;font-size:13.5px;color:rgba(255,255,255,.82)">
                    {checkIcon}
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <button type="button" class="tapsc" onClick={() => openChat('What does the CROW Social plan track?')} style="margin-top:20px;position:relative;z-index:1;width:100%;font-size:14px;font-weight:600;color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.2);border-radius:980px;padding:13px;cursor:pointer">Get started</button>
            </div>
          </div>
        </section>

        {/* DOCUMENTATION */}
        <section id="documentation" data-reveal style="position:relative;padding:56px 22px 44px">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.28em;color:rgba(255,255,255,.4);margin-bottom:10px">[ DOCUMENTATION ]</div>
          <h2 style="margin:0 0 22px;font-size:32px;font-weight:800;letter-spacing:-.035em;color:#fff;line-height:1.05">Build with CROW.</h2>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            {[
              { q: 'Where do I start with the CROW developer docs?', title: 'Developer Docs', desc: 'Get started in minutes with our integration guide.', icon: (
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="m10 13-2 2 2 2" />
                  <path d="m14 13 2 2-2 2" />
                </svg>
              ) },
              { q: 'Show me the CROW API reference.', title: 'API References', desc: 'Endpoints, parameters, and responses.', icon: (
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22v-5" />
                  <path d="M9 7V2" />
                  <path d="M15 7V2" />
                  <path d="M18 7v6a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V7Z" />
                </svg>
              ) },
              { q: 'How does authentication work with CROW?', title: 'Auth & Security', desc: 'Authenticate securely and manage access.', icon: (
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              ) },
              { q: 'Which CROW SDKs and libraries are available?', title: 'SDK & Libraries', desc: 'Helper libraries for Node.js, Python, etc.', icon: (
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              ) },
            ].map(d => (
              <button key={d.title} type="button" onClick={() => openChat(d.q)} class="spot" style="text-align:left;border:1px solid rgba(255,255,255,.09);border-radius:18px;background:rgba(255,255,255,.035);padding:16px;cursor:pointer;color:inherit;display:flex;flex-direction:column;gap:10px">
                <span style="position:relative;z-index:1;width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(168,85,247,.14);color:#D8C2FF">{d.icon}</span>
                <span style="position:relative;z-index:1;font-size:14.5px;font-weight:600;color:#fff">{d.title}</span>
                <span style="position:relative;z-index:1;font-size:12px;line-height:1.4;color:rgba(255,255,255,.5)">{d.desc}</span>
              </button>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style="position:relative;padding:40px 22px 34px;border-top:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.012)">
          <div style="display:flex;align-items:center;gap:11px;margin-bottom:22px">
            <img src="/favicon.webp" alt="CROW" width="40" height="40" style="width:40px;height:40px;object-fit:contain;filter:drop-shadow(0 0 10px rgba(168,85,247,.4))" />
            <div>
              <div style="font-size:18px;font-weight:800;letter-spacing:.04em;color:#fff">CROW</div>
              <div style="font-size:11px;color:rgba(255,255,255,.4)">Cognitive Reasoning Observation Watcher</div>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:22px 16px;margin-bottom:26px">
            <div>
              <h4 style="margin:0 0 12px;font-size:12px;font-weight:600;color:#fff;letter-spacing:.02em">Navigation</h4>
              <div style="display:flex;flex-direction:column;gap:9px">
                <button type="button" onClick={() => go('about')} style="text-align:left;background:none;border:none;color:rgba(255,255,255,.55);font-size:13px;cursor:pointer;padding:0">About</button>
                <button type="button" onClick={() => go('features')} style="text-align:left;background:none;border:none;color:rgba(255,255,255,.55);font-size:13px;cursor:pointer;padding:0">Features</button>
                <button type="button" onClick={() => go('documentation')} style="text-align:left;background:none;border:none;color:rgba(255,255,255,.55);font-size:13px;cursor:pointer;padding:0">Docs</button>
              </div>
            </div>
            <div>
              <h4 style="margin:0 0 12px;font-size:12px;font-weight:600;color:#fff;letter-spacing:.02em">Resources</h4>
              <div style="display:flex;flex-direction:column;gap:9px">
                <button type="button" onClick={() => openChat('Where do I start with the CROW developer docs?')} style="text-align:left;background:none;border:none;color:rgba(255,255,255,.55);font-size:13px;cursor:pointer;padding:0">Developer Docs</button>
                <button type="button" onClick={() => openChat('Show me the CROW API reference.')} style="text-align:left;background:none;border:none;color:rgba(255,255,255,.55);font-size:13px;cursor:pointer;padding:0">API Reference</button>
                <button type="button" onClick={() => openChat('Which CROW SDKs and libraries are available?')} style="text-align:left;background:none;border:none;color:rgba(255,255,255,.55);font-size:13px;cursor:pointer;padding:0">SDKs & Libraries</button>
              </div>
            </div>
            <div>
              <h4 style="margin:0 0 12px;font-size:12px;font-weight:600;color:#fff;letter-spacing:.02em">Contact</h4>
              <a href="mailto:b3@bbyb.dev" style="color:rgba(255,255,255,.55);font-size:13px;text-decoration:none">b3@bbyb.dev</a>
            </div>
            <div>
              <h4 style="margin:0 0 12px;font-size:12px;font-weight:600;color:#fff;letter-spacing:.02em">Connect</h4>
              <div style="display:flex;gap:10px">
                <a href="https://www.instagram.com/crow_b3" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style="width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.65)"><svg width="15" height="15" fill="currentColor" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg></a>
                <a href="https://www.linkedin.com/company/crow-b3" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style="width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.65)"><svg width="15" height="15" fill="currentColor" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" /></svg></a>
                <a href="https://www.facebook.com/share/1EjusvyjRn/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style="width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.65)"><svg width="15" height="15" fill="currentColor" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg></a>
                <a href="#" aria-label="YouTube" style="width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.65)"><svg width="15" height="15" fill="currentColor" viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" /></svg></a>
              </div>
            </div>
          </div>
          <div style="height:1px;background:rgba(255,255,255,.08);margin-bottom:18px"></div>
          <p style="margin:0;text-align:center;font-size:12px;color:rgba(255,255,255,.38)">© 2026 CROW Inc. · All Rights Reserved</p>
        </footer>
      </div>

      {/* MENU OVERLAY */}
      {menuOpen && (
        <div style="position:fixed;inset:0;z-index:55;background:rgba(8,8,11,.9);backdrop-filter:blur(26px);-webkit-backdrop-filter:blur(26px);display:flex;flex-direction:column;animation:crowm-menuIn .3s ease-out both">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 22px">
            <div style="display:flex;align-items:center;gap:9px">
              <img src="/favicon.webp" alt="CROW" width="26" height="26" style="width:26px;height:26px;object-fit:contain" />
              <span style="font-weight:800;font-size:18px;letter-spacing:.04em;color:#fff">CROW</span>
            </div>
            <button type="button" class="tapsc" onClick={() => setMenuOpen(false)} aria-label="Close" style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.06);border:none;border-radius:50%;color:#fff;cursor:pointer">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
          <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:0 30px;gap:6px">
            {[{ id: 'about', l: 'About', d: 0.05 }, { id: 'features', l: 'Features', d: 0.12 }, { id: 'pricing', l: 'Plans', d: 0.19 }, { id: 'documentation', l: 'Docs', d: 0.26 }].map(m => (
              <button key={m.id} type="button" onClick={() => go(m.id)} style={`text-align:left;background:none;border:none;color:#fff;font-size:34px;font-weight:700;letter-spacing:-.03em;padding:10px 0;cursor:pointer;animation:crowm-linkIn .5s cubic-bezier(.2,.8,.2,1) ${m.d}s both`}>{m.l}</button>
            ))}
          </div>
          <div style="padding:24px 30px 34px;animation:crowm-linkIn .5s cubic-bezier(.2,.8,.2,1) .34s both">
            <button type="button" class="tapsc" onClick={() => openChat('What is CROW and what can it do?')} style="width:100%;display:flex;align-items:center;justify-content:center;gap:8px;font-size:16px;font-weight:600;color:#000;background:#fff;border:none;border-radius:980px;padding:16px;cursor:pointer">
              Try CROW
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* CHAT PANEL (slide-in) */}
      <div style={`position:fixed;inset:0;z-index:70;display:flex;flex-direction:column;background:radial-gradient(120% 80% at 50% -6%, #0e0a16 0%, #08080b 52%, #050506 100%);transition:transform .5s cubic-bezier(.28,0,.22,1);transform:translateX(${screen === 'chat' ? '0' : '100%'})`}>
        <div style="display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(12,12,16,.7);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)">
          <button type="button" class="tapsc" onClick={() => setScreen('landing')} aria-label="Back" style="width:40px;height:40px;flex:none;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.06);border:none;border-radius:50%;color:#fff;cursor:pointer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <img src="/favicon.webp" alt="CROW" width="30" height="30" style="width:30px;height:30px;object-fit:contain;filter:drop-shadow(0 0 8px rgba(168,85,247,.5))" />
          <div style="flex:1;min-width:0">
            <div style="font-size:15px;font-weight:700;letter-spacing:.03em;color:#fff">CROW</div>
            <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:rgba(255,255,255,.5)">
              <span style="width:6px;height:6px;border-radius:50%;background:#4ade80;box-shadow:0 0 6px #4ade80"></span>
              AI analyst · online
            </div>
          </div>
        </div>

        <div ref={chatScrollRef} class="nosb" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:12px;padding:18px 16px 8px">
          {messages.map((m, i) => (
            <div key={i} style="display:flex;flex-direction:column">
              {m.role === 'user'
                ? <div style="align-self:flex-end;max-width:82%;padding:11px 15px;border-radius:20px 20px 5px 20px;background:linear-gradient(155deg,#7C3AED,#6D28D9);color:#fff;font-size:14px;line-height:1.5;white-space:pre-wrap;box-shadow:0 4px 14px rgba(124,58,237,.4);animation:crowm-msgIn .35s ease-out both">{m.content}</div>
                : (
                    <div style="align-self:flex-start;max-width:86%;padding:12px 15px;border-radius:20px 20px 20px 5px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.09);color:rgba(255,255,255,.92);font-size:14px;line-height:1.55;white-space:pre-wrap;animation:crowm-msgIn .35s ease-out both">
                      {m.content}
                      {m.streaming && <span style="display:inline-block;width:7px;margin-left:1px;color:#CDAAFF;animation:crowm-blink 1s steps(1) infinite">▍</span>}
                    </div>
                  )}
            </div>
          ))}
          {thinking && (
            <div style="align-self:flex-start;display:flex;gap:5px;padding:14px 16px;border-radius:20px 20px 20px 5px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.09);animation:crowm-msgIn .3s ease-out both">
              <span style="width:7px;height:7px;border-radius:50%;background:#CDAAFF;animation:crowm-dot 1.2s infinite"></span>
              <span style="width:7px;height:7px;border-radius:50%;background:#CDAAFF;animation:crowm-dot 1.2s infinite .15s"></span>
              <span style="width:7px;height:7px;border-radius:50%;background:#CDAAFF;animation:crowm-dot 1.2s infinite .3s"></span>
            </div>
          )}
        </div>

        <form onSubmit={submitChat} style="flex:none;display:flex;align-items:center;gap:8px;padding:12px 14px calc(22px + env(safe-area-inset-bottom));border-top:1px solid rgba(255,255,255,.08);background:rgba(12,12,16,.7);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)">
          <input type="text" value={chatInput} onInput={e => setChatInput((e.target as HTMLInputElement).value)} placeholder="Ask a question..." autocomplete="off" enterkeyhint="send" style="flex:1;min-width:0;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:980px;padding:12px 16px;color:#fff;font-family:'Sora',sans-serif;font-size:14px;outline:none" />
          <button type="submit" class="tapsc" aria-label="Send" style="flex:none;width:44px;height:44px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;background:linear-gradient(155deg,var(--accent,#A855F7),#7C3AED);box-shadow:0 6px 16px rgba(124,58,237,.45)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

function runCounter(el: HTMLElement) {
  const to = Number.parseFloat(el.getAttribute('data-counter') || '0')
  const suf = el.getAttribute('data-suffix') || ''
  const decAttr = el.getAttribute('data-dec')
  const dec = decAttr ? Number.parseInt(decAttr, 10) : 0
  const dur = 1600
  const st = performance.now()
  const tick = (now: number) => {
    const p = Math.min((now - st) / dur, 1)
    const e = 1 - (1 - p) ** 3
    const v = e * to
    el.textContent = (dec ? v.toFixed(dec) : Math.floor(v).toLocaleString()) + suf
    if (p < 1)
      requestAnimationFrame(tick)
    else el.textContent = (dec ? to.toFixed(dec) : to.toLocaleString()) + suf
  }
  requestAnimationFrame(tick)
}
