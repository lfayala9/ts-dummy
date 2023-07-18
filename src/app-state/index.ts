import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Log {
  user: null | string
  token: null | string
}

export interface InitialState extends Log {
  isLoading: boolean
}
export interface Credential {
  email: string
  password: string
}
const initialState: InitialState = {
  user: null,
  token: null,
  isLoading: false
}

const authConfig = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user = action.payload
    }
  }
})

export const { setUser, setToken, setIsLoading } = authConfig.actions
export default authConfig.reducer
