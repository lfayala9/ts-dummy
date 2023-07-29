export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API: string
      ENV: 'test' | 'dev' | 'prod'
    }
  }
}
