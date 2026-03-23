/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string
  readonly PUBLIC_CROW_APP_URL: string
  readonly NEXT_PUBLIC_CROW_APP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
