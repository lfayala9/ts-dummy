// STATE TYPES
export interface UserInfo {
  firstName: string
  lastName: string
  _id: string
  picture: string
}

// export interface PostInfo {
//   postContent?: string
//   _id: string
//   picture?: string
// }

export interface Log {
  user: null | UserInfo
  token: null | string
}

export interface InitialState extends Log {
  isLoading: boolean
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
