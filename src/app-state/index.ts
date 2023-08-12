import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UserInfo, InitialState } from '../types'

const initialState: InitialState = {
  user: null,
  token: null,
  isLoading: false
  // posts: []
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
    setUser: (state, action: PayloadAction<UserInfo | null>) => {
      state.user = action.payload
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    }
  }
})

export const { setUser, setToken, setIsLoading, setLogout } = authConfig.actions
export default authConfig.reducer
