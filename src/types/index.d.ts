// STATE TYPES
export interface UserInfo {
  firstName: string
  lastName: string
  _id: string
  picture: string
  friends: string[]
}
export interface UserType {
  data?: UserInfo | null
}
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

// POSTS TYPES

export interface PostInfo {
  _id: string
  userId: string
  firstName: string
  lastName: string
  friends: string[]
  userPicture?: string
  picture?: string
  postContent: string
  createdAt?: string | number
  likes: Map
}

export interface PostType {
  _id?: string
  post?: PostInfo
}
