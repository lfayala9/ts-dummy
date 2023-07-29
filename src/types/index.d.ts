// STATE TYPES

export interface Log {
  user: null | string
  token: null | string
}

export interface InitialState extends Log {
  isLoading: boolean
  picture: string | null | undefined
}
export interface Credential {
  email: string
  password: string
}

// SETTINGS TYPES

export interface Settings {
  theme: string
}

// LOGIN/SIGN IN TYPES

export interface Error {
  err: boolean
  message: string
  success?: boolean

}
