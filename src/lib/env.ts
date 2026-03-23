/**
 * Client-side env helper.
 *
 * Wrangler vars are injected at runtime by the Layout into `window.__ENV__`.
 * This helper reads from that object, which is populated at request time
 * via a `<script>` tag in the Layout with the Cloudflare Worker runtime env.
 */

declare global {
  interface Window {
    __ENV__?: Record<string, string>
  }
}

function getEnv(key: string, fallback = ''): string {
  if (typeof window !== 'undefined' && window.__ENV__?.[key]) {
    return window.__ENV__[key]
  }
  return fallback
}

export const ENV = {
  get PUBLIC_API_URL() {
    return getEnv('PUBLIC_API_URL', 'http://localhost:8000')
  },
  get PUBLIC_CROW_APP_URL() {
    return getEnv('PUBLIC_CROW_APP_URL', '#')
  },
}
