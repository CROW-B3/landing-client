/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CROW_APP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
