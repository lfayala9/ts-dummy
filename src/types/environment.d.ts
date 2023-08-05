export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_API: string
      ENV: 'test' | 'dev' | 'prod'
    }
  }
}
